import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import Conta from './conta.js'
import Papel from './papel.js'
import Movimentacao from './movimentacao.js'
import Aplicacao from './aplicacao_financeira.js'

const AuthFind = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class User extends compose(BaseModel, AuthFind) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare cpf: string

  @column()
  declare cidade: string

  @column()
  declare estado: string

  @column()
  declare rua: string

  @column()
  declare numero: string

  @column()
  declare papel_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasOne(() => Conta, { foreignKey: 'cliente_id' })
  declare conta: HasOne<typeof Conta>

  @belongsTo(() => Papel, { foreignKey: 'papel_id' })
  declare papel: BelongsTo<typeof Papel>
}
