export type Inventory = {
  getTenantId: () => string
  getProductId: () => string
  getQuantity: () => number

  increase: (amount: number) => Inventory
  decrease: (amount: number) => Inventory
}

export const createInventory = (
  tenantId: string,
  productId: string,
  quantity: number
): Inventory => {
  const ownerTenantId = tenantId
  const ownerProductId = productId
  let currentQuantity = quantity

  return {
    getTenantId: () => ownerTenantId,
    getProductId: () => ownerProductId,
    getQuantity: () => currentQuantity,

    increase: (amount: number) => {
      currentQuantity += amount
      return createInventory(
        ownerTenantId,
        ownerProductId,
        currentQuantity
      )
    },

    decrease: (amount: number) => {
      if (currentQuantity - amount < 0) {
        throw new Error("Inventory cannot be negative")
      }

      currentQuantity -= amount
      return createInventory(
        ownerTenantId,
        ownerProductId,
        currentQuantity
      )
    }
  }
}
