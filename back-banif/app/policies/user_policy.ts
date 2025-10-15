import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class UserPolicy extends BasePolicy {
  list(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].listUser
  }

  view(user: User | null, targetUser: User): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].listUser
  }

  create(user: User | null): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].editUser
  }

  edit(user: User | null, targetUser: User): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].editUser
  }

  delete(user: User | null, targetUser: User): AuthorizerResponse {
    if (!user) return false
    return permissions[user.papel_id].deleteUser
  }
}
