import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Conta from './conta.js'

export default class Movimentacao extends BaseModel {
  public static table = 'movimentacoes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: 'deposito' | 'saque' | 'transferencia'

  @column()
  declare valor: number

  @column()
  declare conta_origem_id: number | null

  @column()
  declare conta_destino_id: number | null

  @column()
  declare descricao: string | null

  @belongsTo(() => Conta, { foreignKey: 'conta_origem_id' })
  declare conta_origem: BelongsTo<typeof Conta>

  @belongsTo(() => Conta, { foreignKey: 'conta_destino_id' })
  declare conta_destino: BelongsTo<typeof Conta>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
