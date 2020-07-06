import { Router } from 'express'

/** Services */
import CreateUserService from '../services/CreateUserService'

const routes = Router()

routes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ name, email, password })

    return res.json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
})

export default routes
