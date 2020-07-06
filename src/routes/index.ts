import { Router } from 'express'

/** Routes */
import usersRouter from './users.routes'

const routes = Router()

routes.use('/users', usersRouter)

export default routes
