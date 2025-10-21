import vine from '@vinejs/vine'

export const createMovimentacao = vine.compile(
  vine.object({
    tipo: vine.enum(['deposito', 'saque', 'transferencia']),
    valor: vine.number().positive(),
    conta_origem_id: vine.number().positive().withoutDecimals().optional(),
    conta_destino_id: vine.number().positive().withoutDecimals().optional(),
    senha: vine.string().optional(),
  })
)
