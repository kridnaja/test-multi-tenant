import { Tenant } from "../entity/Tenant";

export type TenantRepository = {
    findById: (id: string) => Promise<Tenant | null>
    save: (tenant: Tenant) => Promise<void>
}