import AplicacaoFinanceira from '#models/aplicacao_financeira'
import Conta from '#models/conta'
import Movimentacao from '#models/movimentacao'
import Cliente from '#models/user'
import Hash from '@adonisjs/core/services/hash'

interface AplicacaoData {
  conta_id: number
  valor: number
  senha: string
}

export default class AplicacoesService {
  static async listAll() {
    return await AplicacaoFinanceira.query().preload('conta')
  }

  static async create(data: AplicacaoData) {
    const conta = await Conta.findOrFail(data.conta_id)
    const cliente = await Cliente.findOrFail(conta.cliente_id)

    const senhaValida = await Hash.verify(cliente.senha, data.senha)
    if (!senhaValida) throw new Error('Senha incorreta')

    if (conta.saldo < data.valor) throw new Error('Saldo insuficiente para aplicação')

    const aplicacao = await AplicacaoFinanceira.create({
      conta_id: conta.id,
      valor: data.valor,
      status: 'ativo',
    })

    await Movimentacao.create({
      tipo: 'transferencia',
      valor: data.valor,
      conta_origem_id: conta.id,
      conta_destino_id: null,
    })

    conta.saldo = Math.round((conta.saldo - data.valor) * 100) / 100
    await conta.save()

    return { message: 'Aplicação realizada com sucesso', aplicacao }
  }

  static async getById(id: number) {
    return await AplicacaoFinanceira.query().where('id', id).preload('conta').firstOrFail()
  }

  static async update(id: number, data: any) {
    const app = await AplicacaoFinanceira.findOrFail(id)
    app.merge(data)
    await app.save()
    return app
  }

  static async resgatar(id: number) {
    const aplicacao = await AplicacaoFinanceira.findOrFail(id)

    if (aplicacao.status === 'resgatado') {
      throw new Error('Esta aplicação já foi resgatada')
    }

    aplicacao.status = 'resgatado'
    await aplicacao.save()

    const conta = await Conta.findOrFail(aplicacao.conta_id)
    conta.saldo += aplicacao.valor
    await conta.save()

    return { message: 'Aplicação resgatada com sucesso', aplicacao }
  }
}
