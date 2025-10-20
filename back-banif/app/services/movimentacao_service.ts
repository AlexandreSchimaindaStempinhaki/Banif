import Movimentacao from '#models/movimentacao'

export default class MovimentacoesService {
  static async listAll() {
    return await Movimentacao.query()
      .preload('conta_origem', (q) => q.preload('cliente'))
      .preload('conta_destino', (q) => q.preload('cliente'))
  }

  static async create(data: any) {
    return await Movimentacao.create(data)
  }

  static async getById(id: number) {
    return await Movimentacao.findOrFail(id)
  }
}
