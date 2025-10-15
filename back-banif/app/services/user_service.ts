import Hash from '@adonisjs/core/services/hash'
import User from '#models/user'

export default class UserService {
  static async listAll() {
    return await User.all()
  }

  static async create(data: any) {
    data.senha = await Hash.make(data.senha)
    return await User.create(data)
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
