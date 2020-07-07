import { Router } from 'express'

/* Services */
import CreateAuthenticationService from '../services/CreateAuthenticationService'

const routes = Router()

routes.post('/', async (req, res) => {
  const { email, password } = req.body

  const createAuth = new CreateAuthenticationService()

  const auth = await createAuth.execute({ email, password })

  return res.json(auth)
})

export default routes
