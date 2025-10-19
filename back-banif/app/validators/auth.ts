import vine from '@vinejs/vine'

export const createUser = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2).maxLength(100),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    senha: vine.string().minLength(8).maxLength(8),
    cpf: vine.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
    cidade: vine.string().trim().minLength(2).maxLength(100),
    estado: vine.string().trim().minLength(2).maxLength(2),
    rua: vine.string().trim().minLength(2).maxLength(100),
    numero: vine.string().trim().minLength(1).maxLength(6),
    papel_id: vine.number().positive().withoutDecimals(),
  })
)

export const updateUser = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(2).maxLength(100).optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value, ctx: any) => {
        const user = await db.from('users').where('email', value).first()
        return !user || user.id === ctx.id
      })
      .optional(),
    senha: vine.string().minLength(8).maxLength(32).optional(),
    cpf: vine
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      .optional(),
    cidade: vine.string().trim().minLength(2).maxLength(100).optional(),
    estado: vine.string().trim().minLength(2).maxLength(2).optional(),
    rua: vine.string().trim().minLength(2).maxLength(100).optional(),
    numero: vine.string().trim().optional(),
    papel_id: vine.number().positive().withoutDecimals().optional(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    senha: vine.string(),
  })
)
