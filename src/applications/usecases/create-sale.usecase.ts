import { randomUUID } from "crypto"
import { createSale, Sale } from "../../domains/sale/entity/Sale"
import { ProductRepository } from "../../domains/product/repository/ProductRepository"
import { InventoryRepository } from "../../domains/inventory/repository/InventoryRepository"
import { SaleRepository } from "../../domains/sale/repository/SaleRepository"

type Input = {
  tenantId: string
  productId: string
  quantity: number
}

type Deps = {
  productRepo: ProductRepository
  inventoryRepo: InventoryRepository
  saleRepo: SaleRepository
}

export const createSaleUseCase = async (
  input: Input,
  deps: Deps
): Promise<Sale> => {
  const { tenantId, productId, quantity } = input
  const { productRepo, inventoryRepo, saleRepo } = deps

  const product = await productRepo.findByTenantIdAndProductId(
    tenantId,
    productId
  )

  if (!product) {
    throw new Error("Product not found")
  }

  const inventory = await inventoryRepo.findByTenantIdAndProductId(
    tenantId,
    productId
  )

  if (!inventory) {
    throw new Error("Inventory not found")
  }

  const updatedInventory = inventory.decrease(quantity)

  const sale = createSale(
    randomUUID(),
    tenantId,
    productId,
    quantity,
    product.getPrice()
  )

  await inventoryRepo.save(updatedInventory)
  await saleRepo.save(sale)

  return sale
}
