import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import AuthService from '#services/auth_service'

export default class AuthController {
  private authService = new AuthService()

  async login({ request, response }: HttpContext) {
    try {
      const { email, senha } = await request.validateUsing(loginValidator)
      const result = await this.authService.login(email, senha)
      return response.ok(result)
    } catch {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      const token = auth.user?.currentAccessToken
      const result = await this.authService.logout(user, token)
      response.ok(result)
    } catch {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      const result = await this.authService.me(user)
      response.ok(result)
    } catch {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  async tokens({ auth, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      const result = await this.authService.listTokens(user)
      response.ok(result)
    } catch {
      return response.unauthorized({ message: 'Token inválido' })
    }
  }

  async createToken({ auth, request, response }: HttpContext) {
    try {
      const user = await auth.getUserOrFail()
      const options = request.only(['name', 'abilities', 'expiresIn'])
      const result = await this.authService.createToken(user, options)
      return response.created(result)
    } catch (error) {
      return response.badRequest({
        message: 'Erro ao criar token',
        error: error.message,
      })
    }
  }
}
