import { PrismaClient } from "../../generated/prisma/client"
import { InventoryRepository } from "../../domains/inventory/repository/InventoryRepository"
import { Inventory, createInventory } from "../../domains/inventory/entity/Inventory"

export const createPrismaInventoryRepository = (
  prisma: PrismaClient
): InventoryRepository => {

  const toDomain = (record: {
    tenantId: string
    productId: string
    quantity: number
  }): Inventory =>
    createInventory(
      record.tenantId,
      record.productId,
      record.quantity
    )

  const findByTenantIdAndProductId = async (
    tenantId: string,
    productId: string
  ): Promise<Inventory | null> => {
    const record = await prisma.inventory.findUnique({
      where: {
        tenantId_productId: {
          tenantId,
          productId
        }
      }
    })

    return record ? toDomain(record) : null
  }

  const save = async (inventory: Inventory): Promise<void> => {
    await prisma.inventory.upsert({
      where: {
        tenantId_productId: {
          tenantId: inventory.getTenantId(),
          productId: inventory.getProductId()
        }
      },
      update: {
        quantity: inventory.getQuantity()
      },
      create: {
        tenantId: inventory.getTenantId(),
        productId: inventory.getProductId(),
        quantity: inventory.getQuantity()
      }
    })
  }

  return {
    findByTenantIdAndProductId,
    save
  }
}
