import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return { message: 'BANIF Digital Bank API' }
})

router.resource('users', '#controllers/users_controller')
router.resource('contas', '#controllers/contas_controller')
router.resource('movimentacoes', '#controllers/movimentacoes_controller')
router.resource('aplicacoes', '#controllers/aplicacoes_controller')

router
  .group(() => {
    router.post('/login', '#controllers/auth_controller.login')

    router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
    router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
    router.get('/tokens', '#controllers/auth_controller.tokens').use(middleware.auth())
    router.post('/tokens', '#controllers/auth_controller.createToken').use(middleware.auth())
  })
  .prefix('/auth')
