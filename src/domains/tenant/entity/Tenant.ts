export type Tenant = {
    getId: () => string
    getName: () => string
}

export const createTenant = (
    id: string,
    name: string
): Tenant => {
    const tenantId = id
    const tenantName = name

    return {
        getId: () => tenantId,
        getName: () => tenantName
     }
}