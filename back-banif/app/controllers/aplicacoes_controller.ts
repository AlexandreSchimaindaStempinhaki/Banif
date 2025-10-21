import type { HttpContext } from '@adonisjs/core/http'
import {
  createAplicacaoFinanceira,
  updateAplicacaoFinanceira,
} from '#validators/aplicacao_financeira'
import AplicacoesService from '#services/aplicacacao_service'
import AplicacaoPolicy from '#policies/aplicacao_policy'

export default class AplicacoesController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()
      if (await bouncer.with(AplicacaoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar aplicações' })
      }

      const apps = await AplicacoesService.listAll()
      return response.status(200).json({ message: 'OK', data: apps })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async create({}: HttpContext) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(createAplicacaoFinanceira)

    if (await bouncer.with(AplicacaoPolicy).denies('create')) {
      return response.forbidden({ message: 'Você não tem permissão para criar aplicações' })
    }

    try {
      const { message, aplicacao } = await AplicacoesService.create(payload)
      return response.status(201).json({ message, data: aplicacao })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()
      const app = await AplicacoesService.getById(params.id)

      if (await bouncer.with(AplicacaoPolicy).denies('view', app)) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta aplicação' })
      }

      return response.status(200).json({ message: 'OK', data: app })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async edit({ params }: HttpContext) {}

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(updateAplicacaoFinanceira)
    const app = await AplicacoesService.getById(params.id)

    if (await bouncer.with(AplicacaoPolicy).denies('edit', app)) {
      return response.forbidden({ message: 'Você não tem permissão para atualizar esta aplicação' })
    }

    try {
      const updatedApp = await AplicacoesService.resgatar(params.id)
      return response.status(200).json({ message: 'OK', data: updatedApp })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }
}
