import { User } from "../entity/User"

export type UserRepository = {
  findById: (id: string) => Promise<User | null>
  findByEmail: (email: string) => Promise<User | null>
  save: (user: User) => Promise<void>
}
