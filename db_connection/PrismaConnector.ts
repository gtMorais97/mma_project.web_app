import { PrismaClient } from "@prisma/client";
import { IDBConnector } from "./IDBConnector";

export class PrismaConnector implements IDBConnector {

    public client: PrismaClient

    public constructor(prismaClient: PrismaClient) {
        this.client = prismaClient;
    }

    public async RunQuery(query: string) {
    return this.client.$queryRawUnsafe(query);
    }

}