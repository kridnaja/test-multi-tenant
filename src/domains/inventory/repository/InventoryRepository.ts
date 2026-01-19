import { Inventory } from "../entity/Inventory"

export type InventoryRepository = {

  findByTenantIdAndProductId: (
    tenantId: string,
    productId: string
  ) => Promise<Inventory | null>

  save: (inventory: Inventory) => Promise<void>
}
