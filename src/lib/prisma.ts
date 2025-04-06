import { PrismaClient } from "@prisma/client";

// グローバルスコープでPrismaインスタンスを保持できる場所を決める
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}
// Prismaインスタンスがあれば使う、無ければ作成
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// 開発環境でのみ使用
if(process.env.NODE_ENV !== 'production')globalForPrisma.prisma = prisma