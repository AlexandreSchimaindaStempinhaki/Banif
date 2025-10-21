import User from '#models/user'
import Conta from '#models/conta'

export default class UserService {
  static async gerarNumeroConta() {
    let numeroConta
    let contaExiste = true

    while (contaExiste) {
      const base = Math.floor(10000 + Math.random() * 90000)
      const digito = Math.floor(Math.random() * 10)
      numeroConta = `${base}-${digito}`

      const conta = await Conta.query().where('numero_conta', numeroConta).first()
      contaExiste = !!conta
    }

    return numeroConta?.toString()
  }

  static gerarNumeroAgencia() {
    const agencia = Math.floor(1000 + Math.random() * 9000)
    return agencia.toString()
  }
  static async listAll() {
    return await User.query()
      .preload('conta', (contaQuery) => {
        contaQuery
          .preload('movimentacoesOrigem', (movQuery) => {
            movQuery.preload('conta_origem', (c) => c.preload('cliente'))
            movQuery.preload('conta_destino', (c) => c.preload('cliente'))
          })
          .preload('movimentacoesDestino', (movQuery) => {
            movQuery.preload('conta_origem', (c) => c.preload('cliente'))
            movQuery.preload('conta_destino', (c) => c.preload('cliente'))
          })
          .preload('aplicacoes')
      })
      .preload('papel')
  }

  static async create(data: any) {
    data.senha = await data.senha
    const user = await User.create(data)

    if (user.papel_id === 2) {
      const numeroConta = await this.gerarNumeroConta()
      const numeroAgencia = this.gerarNumeroAgencia()

      await Conta.create({
        numero_conta: numeroConta,
        numero_agencia: numeroAgencia,
        saldo: 0,
        cliente_id: user.id,
      })
    }

    return user
  }

  static async getById(id: number) {
    return await User.findOrFail(id)
  }

  static async update(id: number, data: any) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  static async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }
}
