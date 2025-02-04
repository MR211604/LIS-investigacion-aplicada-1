import { JSONFilePreset } from 'lowdb/node'
import { User } from './types/user'

interface Data {
  users: User[]
}

const defaultData: Data = { users: [] }

const db = await JSONFilePreset<Data>('db.json', defaultData)

const { users } = db.data

export {
  db,
  users
}
