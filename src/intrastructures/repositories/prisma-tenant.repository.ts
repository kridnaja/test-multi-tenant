import { prisma } from "../prisma/client";
import { TenantRepository } from "../../domains/tenant/repository/TenantRepository";
import { createTenant } from "../../domains/tenant/entity/Tenant";

export const prismaTenantRepository: TenantRepository = {
  findById: async (id) => {
    const record = await prisma.tenant.findUnique({
      where: { id }
    })

    if (!record) return null

    return createTenant(
      record.id,
      record.name
    )
  },

    save: async (tenant) => {
    await prisma.tenant.upsert({
      where: { id: tenant.getId() },
      update: {
        name: tenant.getName()
      },
      create: {
        id: tenant.getId(),
        name: tenant.getName()
      }
    })
  }
}




