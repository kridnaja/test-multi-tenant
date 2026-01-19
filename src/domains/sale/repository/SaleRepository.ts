import { Sale } from "../entity/Sale"

export type SaleRepository = {
    findByTenantIdAndProductId: (tenantId: string, productId: string) => Promise<Sale[]>
    save: (sale: Sale) => Promise<void>
}
