import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

/** Models */
import User from '../models/User'

interface IRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getRepository(User)

    /** Check if user exists */
    const userExists = await usersRepository.findOne({ where: { email } })

    if (userExists) {
      throw new Error('User already exists')
    }

    /** Encrypt password */
    const passwordHashed = await hash(password, 8)

    /** Create new instance user */
    const user = await usersRepository.create({
      name,
      email,
      password: passwordHashed,
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
