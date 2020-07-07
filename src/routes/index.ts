import { Router } from 'express'

/** Routes */
import usersRouter from './users.routes'
import authenticationRouter from './authentication.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', authenticationRouter)

export default routes
