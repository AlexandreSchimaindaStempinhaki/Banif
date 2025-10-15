import AplicacaoFinanceira from '#models/aplicacao_financeira'

export default class AplicacoesService {
  static async listAll() {
    return await AplicacaoFinanceira.query().preload('conta')
  }

  static async create(data: any) {
    return await AplicacaoFinanceira.create(data)
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
}
