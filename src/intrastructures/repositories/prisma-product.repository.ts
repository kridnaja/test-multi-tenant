import { prisma } from "../prisma/client"
import { ProductRepository } from "../../domains/product/repository/ProductRepository"
import { createProduct } from "../../domains/product/entity/Product"

export const prismaProductRepository: ProductRepository = {

  // 1️⃣ Generic find (use carefully)
  findById: async (id) => {
    const record = await prisma.product.findUnique({
      where: { id }
    })

    if (!record) return null

    return createProduct(
      record.id,
      record.tenantId,
      record.name,
      record.price
    )
  },

  // 2️⃣ List all products of a tenant
  findByTenant: async (tenantId) => {
    const records = await prisma.product.findMany({
      where: { tenantId }
    })

    return records.map((record) =>
      createProduct(
        record.id,
        record.tenantId,
        record.name,
        record.price
      )
    )
  },

  // 3️⃣ Strict tenant-aware lookup
  findByTenantAndId: async (tenantId, productId) => {
    const record = await prisma.product.findFirst({
      where: {
        id: productId,
        tenantId
      }
    })

    if (!record) return null

    return createProduct(
      record.id,
      record.tenantId,
      record.name,
      record.price
    )
  },

  // 4️⃣ Persist product
  save: async (product) => {
    await prisma.product.upsert({
      where: { id: product.getId() },
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
}
