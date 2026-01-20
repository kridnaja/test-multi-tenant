import { PrismaClient } from "../../generated/prisma/client"

/**
 * Prisma Transaction Client type
 */
type PrismaTx = Omit<
  PrismaClient,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends"
>

export const withTransaction = async <T>(
  prisma: PrismaClient,
  fn: (tx: PrismaTx) => Promise<T>
): Promise<T> => {
  return prisma.$transaction(async (tx) => {
    return fn(tx)
  })
}
