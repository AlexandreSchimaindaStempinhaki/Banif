import type { HttpContext } from '@adonisjs/core/http'
import { createUser, updateUser } from '#validators/auth'
import UsersService from '#services/user_service'
import UserPolicy from '#policies/user_policy'

export default class UsersController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      if (await bouncer.with(UserPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar usuários' })
      }
      const users = await UsersService.listAll()
      return response.status(200).json({ message: 'OK', data: users })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async create({}: HttpContext) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(createUser)

    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.forbidden({ message: 'Você não tem permissão para criar usuários' })
    }

    try {
      const newUser = await UsersService.create(payload)
      return response.status(201).json({ message: 'OK', data: newUser })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      const targetUser = await UsersService.getById(params.id)

      if (await bouncer.with(UserPolicy).denies('view', targetUser)) {
        return response.forbidden({ message: 'Você não tem permissão para ver este usuário' })
      }

      return response.status(200).json({ message: 'OK', data: targetUser })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async edit({ params }: HttpContext) {}

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateUser)
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      const targetUser = await UsersService.getById(params.id)

      if (await bouncer.with(UserPolicy).denies('edit', targetUser)) {
        return response.forbidden({ message: 'Você não tem permissão para editar este usuário' })
      }

      const updatedUser = await UsersService.update(params.id, payload)

      return response.status(200).json({ message: 'OK', data: updatedUser })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      const targetUser = await UsersService.getById(params.id)

      if (await bouncer.with(UserPolicy).denies('delete', targetUser)) {
        return response.forbidden({ message: 'Você não tem permissão para deletar este usuário' })
      }

      await UsersService.delete(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }
}
