import { Router } from 'express'

/** Middlewares */
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware'

const routes = Router()

routes.use(AuthenticationMiddleware)

routes.post('/', (req, res) => res.json({ message: 'ok' }))

export default routes
