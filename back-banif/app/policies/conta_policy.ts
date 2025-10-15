import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import Conta from '#models/conta'
import { permissions } from '../utils/permissoes.js'

export default class ContaPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].listConta
  }

  view(user: User | null, conta: Conta): AuthorizerResponse {
    if (!user) return false
    if (user.papel_id === 2 && conta.cliente_id !== user.id) return false
    return permissions[user.papel_id].viewConta
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].createConta
  }

  edit(user: User | null, conta: Conta): AuthorizerResponse {
    if (!user) return false
    if (user.papel_id === 2 && conta.cliente_id !== user.id) return false
    return permissions[user.papel_id].editConta
  }

  delete(user: User | null, conta: Conta): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].deleteConta
  }
}
