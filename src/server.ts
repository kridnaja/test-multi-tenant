import express from "express"
import cors from "cors"
import  saleRouter  from "./routes/sale.route"
import { tenantMiddleware } from "./middlewares/tenant.middleware"

export function createServer() {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(tenantMiddleware)
  app.get("/health", (_, res) => {
    res.json({ status: "ok" })
  })

  app.use("/api", saleRouter)

  return app
}
