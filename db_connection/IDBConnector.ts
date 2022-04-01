import { PrismaClient } from "@prisma/client"

export interface IDBConnector {
    client: PrismaClient
    RunQuery(query: string): Promise<any>
}