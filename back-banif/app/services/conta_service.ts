import Conta from '#models/conta'

export default class ContasService {
  static async listAll() {
    return await Conta.query()
      .preload('cliente')
      .preload('movimentacoesOrigem')
      .preload('movimentacoesDestino')
      .preload('aplicacoes')
  }

  static async create(data: any) {
    return await Conta.create(data)
  }

  static async getById(id: number) {
    return await Conta.query()
      .where('id', id)
      .preload('cliente')
      .preload('movimentacoesOrigem')
      .preload('movimentacoesDestino')
      .preload('aplicacoes')
      .firstOrFail()
  }

  static async update(id: number, data: any) {
    const conta = await Conta.findOrFail(id)
    conta.merge(data)
    await conta.save()
    return conta
  }

  static async delete(id: number) {
    const conta = await Conta.findOrFail(id)
    await conta.delete()
  }
}
