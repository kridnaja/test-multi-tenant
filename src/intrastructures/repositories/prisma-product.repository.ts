import { PrismaClient } from "../../generated/prisma/client"
import { ProductRepository } from "../../domains/product/repository/ProductRepository"
import { Product, createProduct } from "../../domains/product/entity/Product"

export const createPrismaProductRepository = (
  prisma: PrismaClient
): ProductRepository => {



    const toDomain = (record: {
        id: string
        tenantId: string
        name: string
        price: number
      }): Product =>
        createProduct(
          record.id,
          record.tenantId,
          record.name,
          record.price
        )
      

  const findByTenantIdAndProductId = async (
    tenantId: string,
    productId: string
  ): Promise<Product | null> => {
    const record = await prisma.product.findFirst({
      where: {
        tenantId,
        id: productId
      }
    })

    return record ? toDomain(record) : null
  }

  const save = async (product: Product): Promise<void> => {
    await prisma.product.upsert({
      where: {
        tenantId_id: {
          tenantId: product.getTenantId(),
          id: product.getId()
        }
      },
      update: {
        name: product.getName(),
        price: product.getPrice()
      },
      create: {
        id: product.getId(),
        tenantId: product.getTenantId(),
        name: product.getName(),
        price: product.getPrice()
      }
    })
  }

  return {
    findByTenantIdAndProductId,
    save
  }
}
