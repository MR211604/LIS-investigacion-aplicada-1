import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { User } from './types/user'
import { db, users } from './user-schema'
import { Validations } from './validations-repository'

type CreateUser = Pick<User, 'username' | 'password' | 'email' | 'confirmPassword'>

type LoginUser = Pick<User, 'username' | 'password'>

export const UserRepository = {
  async createUser ({ username, password, email, confirmPassword }: CreateUser): Promise<{ _id: string }> {
    Validations.username(username)
    Validations.password(password)
    Validations.email(email)

    if (confirmPassword !== password) {
      throw new Error('Las contraseñas no coinciden')
    }

    const user = users.find(user => user.username === username)

    if (user !== undefined) {
      throw new Error('El nombre de usuario ya existe')
    }

    const id = crypto.randomUUID()
    const hashedPassword = bcrypt.hashSync(password, 10)

    users.push({
      _id: id,
      username,
      email,
      password: hashedPassword
    })
    await db.write()

    return { _id: id }
  },

  loginUser ({ username, password }: LoginUser): Omit<User, 'password'> {
    Validations.username(username)
    Validations.password(password)

    const user = users.find(user => user.username === username)

    if (user === null || user === undefined) {
      throw new Error('Usuario no encontrado')
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
      throw new Error('Contraseña incorrecta')
    }

    const { password: _, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}
