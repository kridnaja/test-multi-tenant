import { Sale } from "../entity/Sale"

export type SaleRepository = {
    findByTenant: (tenantId: string) => Promise<Sale[]>
    save: (sale: Sale) => Promise<void>
}
