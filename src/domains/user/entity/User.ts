export type UserRole = "admin" | "user"

export type User = {
  getId: () => string
  getTenantId: () => string
  getEmail: () => string
  getRole: () => UserRole

  isAdmin: () => boolean
}

export const createUser = (
  id: string,
  tenantId: string,
  email: string,
  role: UserRole
): User => {
  const userId = id
  const ownerTenantId = tenantId
  const userEmail = email
  const userRole = role

  return {
    getId: () => userId,
    getTenantId: () => ownerTenantId,
    getEmail: () => userEmail,
    getRole: () => userRole,
    isAdmin: () => userRole === "admin"
  }
}
