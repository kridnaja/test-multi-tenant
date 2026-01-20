import { PrismaClient } from "../../generated/prisma/client"
import { SaleRepository } from "../../domains/sale/repository/SaleRepository"
import { Sale, createSale } from "../../domains/sale/entity/Sale"

export const createPrismaSaleRepository = (
  prisma: PrismaClient
): SaleRepository => {

  const toDomain = (record: {
    id: string
    tenantId: string
    productId: string
    quantity: number
    price: number
    total: number
    createdAt: Date
  }): Sale =>
    createSale(
      record.id,
      record.tenantId,
      record.productId,
      record.quantity,
      record.price,
      record.createdAt
    )

  const findByTenantIdAndProductId = async (
    tenantId: string,
    productId: string
  ): Promise<Sale[]> => {
    const records = await prisma.sale.findMany({
      where: {
        tenantId,
        productId
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return records.map(toDomain)
  }

  const save = async (sale: Sale): Promise<void> => {
    await prisma.sale.create({
      data: {
        id: sale.getId(),
        tenantId: sale.getTenantId(),
        productId: sale.getProductId(),
        quantity: sale.getQuantity(),
        price: sale.getPrice(),
        total: sale.getTotal(),
        createdAt: sale.getCreatedAt()
      }
    })
  }

  return {
    findByTenantIdAndProductId,
    save
  }
}
