import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Papel from '#models/papel'

export default class extends BaseSeeder {
  async run() {
    await Papel.createMany([
      { nome: 'Gerente', descricao: 'Gerencia contas e clientes' },
      { nome: 'Cliente', descricao: 'Gerencia suas próprias contas' },
    ])
  }
}
