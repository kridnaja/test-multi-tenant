import { Product } from "../entity/Product"

export type ProductRepository = {

  findByTenantIdAndProductId: (
    tenaneId: string,
    productId: string
  ) => Promise<Product | null>


  save: (product: Product) => Promise<void>
}
