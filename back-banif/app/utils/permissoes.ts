export const permissions = [
  // INDEFINIDO - 0
  {
    listUser: false,
    viewUser: false,
    createUser: false,
    editUser: false,
    deleteUser: false,

    listConta: false,
    viewConta: false,
    createConta: false,
    editConta: false,
    deleteConta: false,

    listMovimentacao: false,
    viewMovimentacao: false,
    createMovimentacao: false,

    listAplicacao: false,
    viewAplicacao: false,
    createAplicacao: false,
    editAplicacao: false,
  },
  // GERENTE - 1
  {
    listUser: true,
    viewUser: true,
    createUser: true,
    editUser: true,
    deleteUser: true,

    listConta: true,
    viewConta: true,
    createConta: true,
    editConta: true,
    deleteConta: true,

    listMovimentacao: true,
    viewMovimentacao: true,
    createMovimentacao: true,

    listAplicacao: true,
    viewAplicacao: true,
    createAplicacao: true,
    editAplicacao: true,
  },
  // CLIENTE - 2
  {
    listUser: true,
    viewUser: true,
    createUser: false,
    editUser: false,
    deleteUser: false,

    listConta: false,
    viewConta: true,
    createConta: false,
    editConta: false,
    deleteConta: false,

    listMovimentacao: false,
    viewMovimentacao: true,
    createMovimentacao: true,

    listAplicacao: false,
    viewAplicacao: true,
    createAplicacao: true,
    editAplicacao: true,
  },
]
