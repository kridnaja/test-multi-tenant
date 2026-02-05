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
  
  if (quantity < 0) {
    throw new Error("Initial quantity cannot be negative")
  }

  const ownerTenantId = tenantId
  const ownerProductId = productId
  const currentQuantity = quantity

  return {
    getTenantId: () => ownerTenantId,
    getProductId: () => ownerProductId,
    getQuantity: () => currentQuantity,

    increase: (amount: number) => {
      if (amount <= 0) {
        throw new Error("Amount must be positive")
      }

      return createInventory(
        ownerTenantId,
        ownerProductId,
        currentQuantity + amount
      )
    },

    decrease: (amount: number) => {
      if (amount <= 0) {
        throw new Error("Amount must be positive")
      }

      if (currentQuantity - amount < 0) {
        throw new Error("Insufficient stock")
      }

      return createInventory(
        ownerTenantId,
        ownerProductId,
        currentQuantity - amount
      )
    }
  }
}
