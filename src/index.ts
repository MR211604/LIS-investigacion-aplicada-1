import express from 'express'
import cookieParser from 'cookie-parser'
import { User } from './types/user'
import { UserRepository } from './user-repository'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body as User
    const { _id } = await UserRepository.createUser({ username, email, password, confirmPassword })
    res.status(201).json({
      ok: true,
      message: 'User created successfully',
      _id
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        ok: false,
        message: error.message
      })
    }
  }
})

app.post('/api/login', (req, res) => {
  try {
    const { username, password } = req.body as User
    const { _id, username: user } = UserRepository.loginUser({ username, password })
    const token = jwt.sign({ _id, user }, 'secret', { expiresIn: '1h' })
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
      .status(200).json({
        ok: true,
        message: 'User logged in successfully',
        _id,
        username
      })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.get('/api/protected-resource', (req, res) => {
  const token = req.header('Authorization')

  if (token !== req.cookies.token) {
    res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token as string, 'secret')

    res.status(200).json({
      ok: true,
      message: 'Recurso protegido',
      payload
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Token invalido',
      error
    })
  }
})

app.post('/api/logout', (req, res) => {
  const token = req.header('Authorization')
  if (token === req.cookies.token) {
    res.clearCookie('token').status(200).json({
      ok: true,
      message: 'Sesion cerrada con exito'
    })
  }
  res.status(401).send('Token invalido')
})

app.listen(4000, () => {
  console.log('Server running on port 4000')
})
