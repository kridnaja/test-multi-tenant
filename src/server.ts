import express from "express"
import cors from "cors"
import  saleRouter  from "./routes/sale.route"


export function createServer() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.get("/health", (_, res) => {
    res.json({ status: "ok" })
  })

  app.use("/api", saleRouter)

  return app
}
