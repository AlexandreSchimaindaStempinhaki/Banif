import vine from '@vinejs/vine'

export const createConta = vine.compile(
  vine.object({
    numero_conta: vine.string().trim().minLength(5),
    numero_agencia: vine.string().trim().minLength(3),
    saldo: vine.number().min(0).withoutDecimals(),
    cliente_id: vine.number().positive().withoutDecimals(),
  })
)

export const updateConta = vine.compile(
  vine.object({
    numero_conta: vine.string().trim().minLength(5).optional(),
    numero_agencia: vine.string().trim().minLength(3).optional(),
    saldo: vine.number().min(0).withoutDecimals().optional(),
    cliente_id: vine.number().positive().withoutDecimals().optional(),
  })
)
