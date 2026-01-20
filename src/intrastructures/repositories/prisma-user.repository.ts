import { PrismaClient } from "../../generated/prisma/client"
import { UserRepository } from "../../domains/user/repository/UserRepository"
import { User, createUser } from "../../domains/user/entity/User"




export const createPrismaUserRepository = (
  prisma: PrismaClient
): UserRepository => {
  const toDomain = (record: {
    id: string
    tenantId: string
    email: string
    role: "admin" | "user"
  }): User =>
    createUser(
      record.id,
      record.tenantId,
      record.email,
      record.role
    )

  const findByTenantIdAndUserId = async (
    tenantId: string,
    userId: string
  ): Promise<User | null> => {
    const record = await prisma.user.findFirst({
      where: {
        id: userId,
        tenantId
      }
    })

    return record ? toDomain(record) : null
  }

  const findByTenantIdAndEmail = async (
    tenantId: string,
    email: string
  ): Promise<User | null> => {
    const record = await prisma.user.findFirst({
      where: {
        tenantId,
        email
      }
    })

    return record ? toDomain(record) : null
  }

  const save = async (user: User): Promise<void> => {
    await prisma.user.upsert({
      where: {
        tenantId_id: {
          tenantId: user.getTenantId(),
          id: user.getId()
        }
      },
      update: {
        email: user.getEmail(),
        role: user.getRole()
      },
      create: {
        id: user.getId(),
        tenantId: user.getTenantId(),
        email: user.getEmail(),
        role: user.getRole()
      }
    })
  }
  

  return {
    findByTenantIdAndUserId,
    findByTenantIdAndEmail,
    save
  }
}
