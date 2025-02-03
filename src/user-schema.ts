import DbLocal from 'db-local'

const { Schema } = new DbLocal({ path: './db' })

export const UserSchema = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
})
