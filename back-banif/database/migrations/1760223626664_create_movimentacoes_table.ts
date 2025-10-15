import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'movimentacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('tipo', ['deposito', 'saque', 'transferencia']).notNullable()
      table.decimal('valor', 12, 2).notNullable()
      table
        .integer('conta_origem_id')
        .unsigned()
        .references('id')
        .inTable('contas')
        .onDelete('SET NULL')
      table
        .integer('conta_destino_id')
        .unsigned()
        .references('id')
        .inTable('contas')
        .onDelete('SET NULL')

      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
