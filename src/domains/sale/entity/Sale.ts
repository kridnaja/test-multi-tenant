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
