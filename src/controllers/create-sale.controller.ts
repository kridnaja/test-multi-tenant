import { Request, Response } from "express"
import { prisma } from "../intrastructures/prisma/client"
import { createSaleUseCase } from "../applications/usecases/create-sale.usecase"
import { createPrismaProductRepository } from "../intrastructures/repositories/prisma-product.repository"
import { createPrismaInventoryRepository } from "../intrastructures/repositories/prisma-inventory.repository"
import { createPrismaSaleRepository } from "../intrastructures/repositories/prisma-sale.repository"

export const createSaleController = async (
  req: Request,
  res: Response
) => {
  try {
    const tenantId = req.tenantId
    if (!tenantId) {
      return res.status(400).json({ message: "Missing tenant id" })
    }

    const { productId, quantity } = req.body
    if (!productId || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid input" })
    }

    const sale = await prisma.$transaction(async (tx) => {
      const productRepo = createPrismaProductRepository(tx)
      const inventoryRepo = createPrismaInventoryRepository(tx)
      const saleRepo = createPrismaSaleRepository(tx)

      return createSaleUseCase(
        { tenantId, productId, quantity },
        { productRepo, inventoryRepo, saleRepo }
      )
    })

    return res.status(201).json({
      id: sale.getId(),
      tenantId: sale.getTenantId(),
      productId: sale.getProductId(),
      quantity: sale.getQuantity(),
      price: sale.getPrice(),
      total: sale.getTotal()
    })
  } catch (error: any) {
    return res.status(400).json({
      message: error.message ?? "Unexpected error"
    })
  }
}
