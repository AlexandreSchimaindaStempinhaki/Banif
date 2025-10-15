import vine from '@vinejs/vine'

// Criação de aplicação financeira (create)
export const createAplicacaoFinanceira = vine.compile(
  vine.object({
    tipo: vine.enum(['tesouro_direto', 'titulos', 'acoes']),
    valor: vine.number().positive(),
    conta_id: vine.number().positive().withoutDecimals(),
    status: vine.enum(['ativo', 'resgatado']).optional(),
  })
)

export const updateAplicacaoFinanceira = vine.compile(
  vine.object({
    tipo: vine.enum(['tesouro_direto', 'titulos', 'acoes']).optional(),
    valor: vine.number().positive().optional(),
    conta_id: vine.number().positive().withoutDecimals().optional(),
    status: vine.enum(['ativo', 'resgatado']).optional(),
  })
)
