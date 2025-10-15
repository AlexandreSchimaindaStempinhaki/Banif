import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Conta from './conta.js'

export default class AplicacaoFinanceira extends BaseModel {
  public static table = 'aplicacoes_financeiras'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'tesouro_direto' | 'titulos' | 'acoes'

  @column()
  declare valor: number

  @column()
  declare status: 'ativo' | 'resgatado'

  @column()
  declare conta_id: number

  @belongsTo(() => Conta, { foreignKey: 'conta_id' })
  declare conta: BelongsTo<typeof Conta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
