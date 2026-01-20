import { Router } from "express"
import { tenantMiddleware } from "../middlewares/tenant.middleware"
import { createSaleController } from "../controllers/create-sale.controller"

const router = Router()

router.post(
  "/sales",
  tenantMiddleware,        
  createSaleController
)

export default router
