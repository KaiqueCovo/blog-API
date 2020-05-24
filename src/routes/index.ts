import { Router } from 'express'

/** Routes */
import postsRouter from './posts.routes'

const routes = Router()

routes.use('/posts', postsRouter)

export default routes
