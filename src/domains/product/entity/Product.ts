export type Product = {
  getId: () => string
  getTenantId: () => string
  getName: () => string
  getPrice: () => number
}

export const createProduct = (
  id: string,
  tenantId: string,
  name: string,
  price: number
): Product => {
  const productId = id
  const ownerTenantId = tenantId
  const productName = name
  const productPrice = price

  return {
    getId: () => productId,
    getTenantId: () => ownerTenantId,
    getName: () => productName,
    getPrice: () => productPrice
  }
}
