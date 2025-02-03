export const Validations = {
  username (username: string) {
    if (username === undefined) throw new Error('El nombre de usuario es requerido')
    if (typeof username !== 'string') throw new Error('El nombre de usuario debe ser un string')
  },

  email (email: string) {
    if (email === undefined) throw new Error('El email es requerido')
    if (typeof email !== 'string') throw new Error('El email debe ser un string')
    if (!email.includes('@')) throw new Error('El email debe ser un email válido')
  },

  password (password: string) {
    if (password === undefined) throw new Error('La contraseña es requerida')
    if (typeof password !== 'string') throw new Error('La contraseña debe ser un string')
    if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres')
  }
}
