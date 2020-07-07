import { Router } from 'express'

/** Routes */
import usersRouter from './users.routes'
import authenticationRouter from './authentication.routes'
import postsRouter from './posts.routes'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/auth', authenticationRouter)
routes.use('/posts', postsRouter)

export default routes
