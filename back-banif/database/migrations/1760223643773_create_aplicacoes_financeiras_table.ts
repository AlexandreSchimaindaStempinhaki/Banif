import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'aplicacoes_financeiras'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('tipo', ['tesouro_direto', 'titulos', 'acoes']).notNullable()
      table.decimal('valor', 12, 2).notNullable()
      table.integer('conta_id').unsigned().references('id').inTable('contas').onDelete('CASCADE')
      table.enum('status', ['ativo', 'resgatado']).defaultTo('ativo')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
