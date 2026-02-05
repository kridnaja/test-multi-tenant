import { Request, Response } from "express"
import { prisma } from "../intrastructures/prisma/client"
import { createSaleService } from "../applications/services/create-sale.service"

export const createSaleController = async (
  req: Request,
  res: Response
) => {
  try {
    const tenantId = req.tenantId
    console.log(req.tenantId)
    if (!tenantId) {
      return res.status(400).json({ message: "Missing tenant id" })
    }

    const { productId, quantity } = req.body
    if (!productId || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid input" })
    }

    const sale = await createSaleService(prisma, {
      tenantId,
      productId,
      quantity
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
