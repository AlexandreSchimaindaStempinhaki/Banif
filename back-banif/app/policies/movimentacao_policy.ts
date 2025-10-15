import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import Movimentacao from '#models/movimentacao'
import { permissions } from '../utils/permissoes.js'

export default class MovimentacaoPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].listMovimentacao
  }

  view(user: User | null, mov: Movimentacao): AuthorizerResponse {
    if (!user) return false
    if (
      user.papel_id === 2 &&
      (mov.conta_origem.cliente.id !== user.id || mov.conta_destino.cliente_id !== user.id)
    )
      return false
    return permissions[user.papel_id].viewMovimentacao
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].createMovimentacao
  }
}
