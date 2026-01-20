import { PrismaClient } from "../../generated/prisma/client"
import { TenantRepository } from "../../domains/tenant/repository/TenantRepository"
import { Tenant, createTenant } from "../../domains/tenant/entity/Tenant"

export const createPrismaTenantRepository = (
  prisma: PrismaClient
): TenantRepository => {

  const toDomain = (record: {
    id: string
    name: string
  }): Tenant =>
    createTenant(
      record.id,
      record.name
    )

  const findById = async (
    tenantId: string
  ): Promise<Tenant | null> => {
    const record = await prisma.tenant.findUnique({
      where: { id: tenantId }
    })

    return record ? toDomain(record) : null
  }

  const save = async (tenant: Tenant): Promise<void> => {
    await prisma.tenant.upsert({
      where: {
        id: tenant.getId()
      },
      update: {
        name: tenant.getName()
      },
      create: {
        id: tenant.getId(),
        name: tenant.getName()
      }
    })
  }

  return {
    findById,
    save
  }
}
