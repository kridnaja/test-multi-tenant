import { createSale } from "../../domains/sale/entity/Sale"

import { ProductRepository } from "../../domains/product/repository/ProductRepository"
import { InventoryRepository } from "../../domains/inventory/repository/InventoryRepository"
import { SaleRepository } from "../../domains/sale/repository/SaleRepository"

type CreateSaleInput = {
  tenantId: string
  productId: string
  quantity: number
}

type CreateSaleDeps = {
  productRepo: ProductRepository
  inventoryRepo: InventoryRepository
  saleRepo: SaleRepository
}

export const createSaleUseCase = async (
  input: CreateSaleInput,
  deps: CreateSaleDeps
) => {
  const { tenantId, productId, quantity } = input
  const { productRepo, inventoryRepo, saleRepo } = deps

  // 1. Load product
  const product = await productRepo.findById(productId)
  if (!product || product.getTenantId() !== tenantId) {
    throw new Error("Product not found")
  }

  // 2. Load inventory
  const inventory = await inventoryRepo.findByTenantAndProduct(
    tenantId,
    productId
  )
  if (!inventory) {
    throw new Error("Inventory not found")
  }

  // 3. Deduct inventory (business rule inside domain)
  const updatedInventory = inventory.decrease(quantity)

  // 4. Save inventory
  await inventoryRepo.save(updatedInventory)

  // 5. Create sale record
  const sale = createSale(
    crypto.randomUUID(),
    tenantId,
    productId,
    quantity,
    product.getPrice()
  )

  // 6. Save sale
  await saleRepo.save(sale)

  return sale
}
