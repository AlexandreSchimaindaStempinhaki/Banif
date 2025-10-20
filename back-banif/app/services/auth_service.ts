import User from '#models/user'
import { permissions } from '../utils/permissoes.js'

export default class AuthService {
  async login(email: string, senha: string) {
    const user = await User.verifyCredentials(email, senha)

    const token = await User.accessTokens.create(user, ['*'], {
      name: 'Login Token',
      expiresIn: '30 days',
    })

    return {
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        papel_id: user.papel_id,
      },
      token: {
        type: 'bearer',
        value: token.value!.release(),
        expiresAt: token.expiresAt,
      },
      permissions: { ...permissions[user.papel_id] },
    }
  }

  async logout(user: User, currentToken: any) {
    if (currentToken) {
      await User.accessTokens.delete(user, currentToken.identifier)
    }

    return { message: 'Logout realizado com sucesso' }
  }

  async me(user: User) {
    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        papel_id: user.papel_id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }
  }

  async listTokens(user: User) {
    const tokens = await User.accessTokens.all(user)

    return {
      tokens: tokens.map((token) => ({
        name: token.name,
        type: token.type,
        abilities: token.abilities,
        lastUsedAt: token.lastUsedAt,
        expiresAt: token.expiresAt,
        createdAt: token.createdAt,
      })),
    }
  }

  async createToken(
    user: User,
    options: { name?: string; abilities?: string[]; expiresIn?: string }
  ) {
    const token = await User.accessTokens.create(user, options.abilities || ['*'], {
      name: options.name || 'API Token',
      expiresIn: options.expiresIn || '30 days',
    })

    return {
      message: 'Token criado com sucesso',
      token: {
        type: 'bearer',
        value: token.value!.release(),
        name: token.name,
        abilities: token.abilities,
        expiresAt: token.expiresAt,
      },
    }
  }
}
