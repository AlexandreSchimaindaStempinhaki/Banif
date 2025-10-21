import Hash from '@adonisjs/core/services/hash'
import Conta from '#models/conta'
import Cliente from '#models/user'
import Movimentacao from '#models/movimentacao'

interface TransferenciaData {
  tipo: 'transferencia'
  valor: number
  conta_origem_id: number
  conta_destino_id: number
  senha: string
}

interface DepositoData {
  tipo: 'deposito'
  valor: number
  conta_destino_id: number
  senha: string
}

export default class MovimentacoesService {
  static listAll() {
    throw new Error('Method not implemented.')
  }
  static async create(data: {
    tipo: 'transferencia' | 'deposito'
    valor: number
    conta_origem_id?: number
    conta_destino_id?: number
    senha?: string
    cliente_id?: number
  }) {
    switch (data.tipo) {
      case 'transferencia':
        if (!data.senha) throw new Error('Senha obrigatória para transferência')
        return await this.createTransferencia(data as TransferenciaData)

      case 'deposito':
        if (!data.senha) throw new Error('Senha obrigatória para depósito')
        return await this.createDeposito(data as DepositoData)

      default:
        throw new Error('Tipo de movimentação inválido')
    }
  }

  static async createDeposito(data: DepositoData) {
    // 🔹 Busca a conta de destino
    const conta = await Conta.findOrFail(data.conta_destino_id)

    // 🔹 Verifica a senha do cliente associado à conta
    const cliente = await conta.related('cliente').query().firstOrFail()
    const senhaValida = await Hash.verify(cliente.senha, data.senha)
    if (!senhaValida) throw new Error('Senha incorreta')

    // 🔹 Atualiza saldo com arredondamento
    const valorCentavos = Math.round(data.valor * 100)
    conta.saldo = Math.round(conta.saldo * 100 + valorCentavos) / 100
    await conta.save()

    // 🔹 Cria a movimentação
    await Movimentacao.create({
      tipo: 'deposito',
      valor: data.valor,
      conta_origem_id: null, // depósito “externo”
      conta_destino_id: conta.id,
    })

    return { message: 'Depósito realizado com sucesso', conta }
  }

  static async createTransferencia(data: TransferenciaData) {
    const contaOrigem = await Conta.findOrFail(data.conta_origem_id)
    const clienteOrigem = await Cliente.findOrFail(contaOrigem.cliente_id)
    const contaDestino = await Conta.findOrFail(data.conta_destino_id)

    const senhaValida = await Hash.verify(clienteOrigem.senha, data.senha)
    if (!senhaValida) throw new Error('Senha incorreta')

    const valorCentavos = Math.round(data.valor * 100)

    contaOrigem.saldo = Math.round(contaOrigem.saldo * 100 - valorCentavos) / 100
    contaDestino.saldo = Math.round(contaDestino.saldo * 100 + valorCentavos) / 100

    await contaOrigem.save()
    await contaDestino.save()

    await Movimentacao.create({
      tipo: 'transferencia',
      valor: data.valor,
      conta_origem_id: contaOrigem.id,
      conta_destino_id: contaDestino.id,
    })

    return { message: 'Transferência realizada com sucesso' }
  }

  static async getById(id: number) {
    const movimentacao = await Movimentacao.findOrFail(id)
    return movimentacao
  }
}
