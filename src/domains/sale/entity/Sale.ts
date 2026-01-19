export type Sale = {
  getId: () => string
  getTenantId: () => string
  getProductId: () => string
  getQuantity: () => number
  getPrice: () => number
  getTotal: () => number
  getCreatedAt: () => Date
}

export const createSale = (
  id: string,
  tenantId: string,
  productId: string,
  quantity: number,
  price: number,
  createdAt: Date = new Date()
): Sale => {
  if (quantity <= 0) {
    throw new Error("Sale quantity must be positive")
  }

  if (price < 0) {
    throw new Error("Sale price must be >= 0")
  }

  if (createdAt.getTime() > Date.now()) {
    throw new Error("Sale date cannot be in the future")
  }

  const saleId = id
  const ownerTenantId = tenantId
  const soldProductId = productId
  const soldQuantity = quantity
  const soldPrice = price
  const timestamp = createdAt

  return {
    getId: () => saleId,
    getTenantId: () => ownerTenantId,
    getProductId: () => soldProductId,
    getQuantity: () => soldQuantity,
    getPrice: () => soldPrice,
    getTotal: () => soldQuantity * soldPrice,
    getCreatedAt: () => timestamp
  }
}
