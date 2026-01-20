import { PrismaClient } from "../../generated/prisma/client"

import { withTransaction } from "../../intrastructures/prisma/transaction"

import { createSaleUseCase } from "../usecases/create-sale.usecase"

import { createPrismaProductRepository } from "../../intrastructures/repositories/prisma-product.repository"
import { createPrismaInventoryRepository } from "../../intrastructures/repositories/prisma-inventory.repository"
import { createPrismaSaleRepository } from "../../intrastructures/repositories/prisma-sale.repository"

type Input = {
  tenantId: string
  productId: string
  quantity: number
}

export const createSaleService = async (
  prisma: PrismaClient,
  input: Input
) => {
  return withTransaction(prisma, async (tx) => {
    const productRepo = createPrismaProductRepository(tx)
    const inventoryRepo = createPrismaInventoryRepository(tx)
    const saleRepo = createPrismaSaleRepository(tx)

    return createSaleUseCase(input, {
      productRepo,
      inventoryRepo,
      saleRepo
    })
  })
}
