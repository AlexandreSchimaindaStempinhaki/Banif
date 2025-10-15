import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        nome: 'Administrador BANIF',
        email: 'admin@banif.com',
        senha: 'senha123',
        cpf: '000.000.000-00',
        cidade: 'Paranaguá',
        estado: 'PR',
        rua: 'Rua Principal',
        numero: '100',
        papel_id: 1,
      },
      {
        nome: 'Cliente Teste',
        email: 'cliente@banif.com',
        senha: 'cliente123',
        cpf: '111.111.111-11',
        cidade: 'Paranaguá',
        estado: 'PR',
        rua: 'Rua Secundária',
        numero: '50',
        papel_id: 2,
      },
    ])
  }
}
