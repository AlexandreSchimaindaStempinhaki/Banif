import type { HttpContext } from '@adonisjs/core/http'
import { createConta, updateConta } from '#validators/conta'
import ContasService from '#services/conta_service'
import ContaPolicy from '#policies/conta_policy'

export default class ContasController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      if (await bouncer.with(ContaPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar contas' })
      }

      const contas = await ContasService.listAll()
      return response.status(200).json({ message: 'OK', data: contas })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async create({}: HttpContext) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(createConta)
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      if (await bouncer.with(ContaPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar contas' })
      }

      const conta = await ContasService.create(payload)
      return response.status(201).json({ message: 'OK', data: conta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()
      const conta = await ContasService.getById(params.id)

      if (await bouncer.with(ContaPolicy).denies('view', conta)) {
        return response.forbidden({ message: 'Você não tem permissão para visualizar esta conta' })
      }

      return response.status(200).json({ message: 'OK', data: conta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async edit({ params }: HttpContext) {}

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const payload = await request.validateUsing(updateConta)
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()
      const conta = await ContasService.getById(params.id)

      if (await bouncer.with(ContaPolicy).denies('edit', conta)) {
        return response.forbidden({ message: 'Você não tem permissão para editar esta conta' })
      }

      const updatedConta = await ContasService.update(params.id, payload)
      return response.status(200).json({ message: 'OK', data: updatedConta })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async destroy({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()
      const conta = await ContasService.getById(params.id)

      if (await bouncer.with(ContaPolicy).denies('delete', conta)) {
        return response.forbidden({ message: 'Você não tem permissão para excluir esta conta' })
      }

      await ContasService.delete(params.id)
      return response.status(200).json({ message: 'OK' })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }
}
