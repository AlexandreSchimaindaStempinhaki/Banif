import type { HttpContext } from '@adonisjs/core/http'
import { createMovimentacao } from '#validators/movimentacao'
import MovimentacoesService from '#services/movimentacao_service'
import MovimentacaoPolicy from '#policies/movimentacao_policy'

export default class MovimentacoesController {
  async index({ response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('list')) {
        return response.forbidden({ message: 'Você não tem permissão para listar movimentações' })
      }

      const movs = await MovimentacoesService.listAll()
      return response.status(200).json({ message: 'OK', data: movs })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async create({}: HttpContext) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      if (await bouncer.with(MovimentacaoPolicy).denies('create')) {
        return response.forbidden({ message: 'Você não tem permissão para criar movimentações' })
      }

      const payload = await request.validateUsing(createMovimentacao)
      const movimentacao = await MovimentacoesService.create(payload)
      return response.status(201).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async show({ params, response, auth, bouncer }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.getUserOrFail()

      const movimentacao = await MovimentacoesService.getById(params.id)
      if (await bouncer.with(MovimentacaoPolicy).denies('view', movimentacao)) {
        return response.forbidden({ message: 'Você não tem permissão para ver esta movimentação' })
      }

      return response.status(200).json({ message: 'OK', data: movimentacao })
    } catch (error) {
      return response.status(500).json({ message: 'ERROR', details: error.message })
    }
  }

  async edit({ params }: HttpContext) {}

  async update({}: HttpContext) {}

  async destroy({ params }: HttpContext) {}
}
