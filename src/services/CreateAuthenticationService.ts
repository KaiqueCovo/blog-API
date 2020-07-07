import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

/** Models */
import User from '../models/User'

/** Configs */
import AuthConfig from '../configs/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class CreateAuthenticationService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const authenticationRepository = getRepository(User)

    /** Find user with email */
    const user = await authenticationRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('User not exists')
    }

    /** Compare password */
    const comparePassword = await compare(password, user.password)

    if (!comparePassword) {
      throw new Error('Email/Password incorrect')
    }

    /** Generate token */
    const { secret, expiresIn } = AuthConfig

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    delete user.password

    return { user, token }
  }
}

export default CreateAuthenticationService
