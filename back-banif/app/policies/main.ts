export const policies = {
  AplicacaoPolicy: () => import('#policies/aplicacao_policy'),
  MovimentacaoPolicy: () => import('#policies/movimentacao_policy'),
  ContaPolicy: () => import('#policies/conta_policy'),
  UserPolicy: () => import('#policies/user_policy'),
}
