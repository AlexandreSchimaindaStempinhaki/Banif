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

  static async createTransferencia(data: TransferenciaData) {
    const contaOrigem = await Conta.findOrFail(data.conta_origem_id)
    const clienteOrigem = await Cliente.findOrFail(contaOrigem.cliente_id)

    const senhaValida = await Hash.verify(clienteOrigem.senha, data.senha)
    if (!senhaValida) throw new Error('Senha incorreta')

    if (contaOrigem.saldo < data.valor) throw new Error('Saldo insuficiente')

    const contaDestino = await Conta.findOrFail(data.conta_destino_id)

    await Movimentacao.create({
      tipo: 'transferencia',
      valor: data.valor,
      conta_origem_id: contaOrigem.id,
      conta_destino_id: contaDestino.id,
    })

    contaOrigem.saldo -= data.valor
    contaDestino.saldo += data.valor
    await contaOrigem.save()
    await contaDestino.save()

    return { message: 'Transferência realizada com sucesso' }
  }

  static async getById(id: number) {
    return await Movimentacao.findOrFail(id)
  }
}
