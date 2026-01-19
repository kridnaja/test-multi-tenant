import { User } from "../entity/User"

export type UserRepository = {
  findByTenantIdAndUserId: (
    tenantId: string,
    userId: string
  ) => Promise<User | null>

  findByTenantIdAndEmail: (
    tenantId: string,
    email: string
  ) => Promise<User | null>

  save: (user: User) => Promise<void>
}
