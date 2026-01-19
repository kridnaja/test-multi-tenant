import { Product } from "../entity/Product"

export type ProductRepository = {
  findById: (id: string) => Promise<Product | null>
  findByTenant: (tenantId: string) => Promise<Product[]>
  save: (product: Product) => Promise<void>
}
