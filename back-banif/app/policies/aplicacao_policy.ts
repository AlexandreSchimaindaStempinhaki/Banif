import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import Aplicacao from '#models/aplicacao_financeira'
import { permissions } from '../utils/permissoes.js'

export default class AplicacaoPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].listAplicacao
  }

  view(user: User | null, app: Aplicacao): AuthorizerResponse {
    if (!user) return false
    if (user.papel_id === 2 && app.conta.cliente_id !== user.id) return false
    return permissions[user.papel_id].viewAplicacao
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].createAplicacao
  }

  edit(user: User | null, app: Aplicacao): AuthorizerResponse {
    if (!user) return false
    if (user.papel_id === 2 && app.conta.cliente_id !== user.id) return false
    return permissions[user.papel_id].editAplicacao
  }
}
