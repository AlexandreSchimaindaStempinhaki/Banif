import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nome').nullable()
      table.string('email').notNullable().unique()
      table.string('senha').notNullable()
      table.string('cpf').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()
      table.string('rua').notNullable()
      table.string('numero').notNullable()
      table.integer('papel_id').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
