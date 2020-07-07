import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

/** Configs */
import AuthConfig from '../configs/auth'

interface IToken {
  iat: number
  exp: number
  sub: string
}

function AuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  /** Get token from header */
  const authHeader = req.headers.authorization

  /** Check if token exists */
  if (!authHeader) {
    throw new Error('Token is required')
  }

  /** Bearer token destructuring */
  const [, token] = authHeader.split(' ')

  try {
    /** Token decode */
    const { secret } = AuthConfig

    const decoded = verify(token, secret)

    const { sub } = decoded as IToken

    req.user = {
      id: sub,
    }

    return next()
  } catch {
    throw new Error('Invalid JWT Token')
  }
}

export default AuthenticationMiddleware
