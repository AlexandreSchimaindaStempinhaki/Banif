import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Movimentacao from './movimentacao.js'
import AplicacaoFinanceira from './aplicacao_financeira.js'

export default class Conta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero_conta: string

  @column()
  declare numero_agencia: string

  @column()
  declare saldo: number

  @column()
  declare cliente_id: number

  @belongsTo(() => User, { foreignKey: 'cliente_id' })
  declare cliente: BelongsTo<typeof User>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_origem_id' })
  declare movimentacoesOrigem: HasMany<typeof Movimentacao>

  @hasMany(() => Movimentacao, { foreignKey: 'conta_destino_id' })
  declare movimentacoesDestino: HasMany<typeof Movimentacao>

  @hasMany(() => AplicacaoFinanceira, { foreignKey: 'conta_id' })
  declare aplicacoes: HasMany<typeof AplicacaoFinanceira>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
