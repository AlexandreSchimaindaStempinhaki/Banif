import Movimentacao from '#models/movimentacao'
import Conta from '#models/conta'
import Cliente from '#models/user'
import Hash from '@adonisjs/core/services/hash'

interface TransferenciaData {
  valor: number
  conta_origem_id: number
  conta_destino_id: number
  senha: string
}

export default class MovimentacoesService {
  static async listAll() {
    return await Movimentacao.query()
      .preload('conta_origem', (q) => q.preload('cliente'))
      .preload('conta_destino', (q) => q.preload('cliente'))
  }

  static async create(data: {
    tipo: 'transferencia' | 'deposito' | 'saque'
    valor: number
    conta_origem_id?: number
    conta_destino_id?: number
    senha?: string
  }) {
    switch (data.tipo) {
      case 'transferencia':
        if (!data.senha) throw new Error('Senha obrigatória para transferência')
        return await this.createTransferencia(data as TransferenciaData)

      case 'deposito':
        if (!data.conta_destino_id) throw new Error('Conta destino obrigatória')
        const contaDestino = await Conta.findOrFail(data.conta_destino_id)
        contaDestino.saldo += data.valor
        await contaDestino.save()
        await Movimentacao.create({
          tipo: 'deposito',
          valor: data.valor,
          conta_destino_id: contaDestino.id,
        })
        return { message: 'Depósito realizado com sucesso' }
      default:
        throw new Error('Tipo de movimentação inválido')
    }
  }

  static async createTransferencia(data: TransferenciaData) {
    const contaOrigem = await Conta.findOrFail(data.conta_origem_id)
    const clienteOrigem = await Cliente.findOrFail(contaOrigem.cliente_id)

    const contaDestino = await Conta.findOrFail(data.conta_destino_id)

    const senhaValida = await Hash.verify(clienteOrigem.senha, data.senha)
    if (!senhaValida) throw new Error('Senha incorreta')

    await Movimentacao.create({
      tipo: 'transferencia',
      valor: data.valor,
      conta_origem_id: contaOrigem.id,
      conta_destino_id: contaDestino.id,
    })

    const valorCentavos = Math.round(data.valor * 100)

    contaOrigem.saldo = Math.round(contaOrigem.saldo * 100 - valorCentavos) / 100
    contaDestino.saldo = Math.round(contaDestino.saldo * 100 + valorCentavos) / 100

    await contaOrigem.save()
    await contaDestino.save()

    return { message: 'Transferência realizada com sucesso' }
  }

  static async getById(id: number) {
    return await Movimentacao.findOrFail(id)
  }
}
