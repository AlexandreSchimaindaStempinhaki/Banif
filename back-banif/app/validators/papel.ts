import vine from '@vinejs/vine'

// Criação de papel (create)
export const createPapel = vine.compile(
  vine.object({
    nome: vine.string().trim().minLength(3),
    descricao: vine.string().trim().optional(),
  })
)
