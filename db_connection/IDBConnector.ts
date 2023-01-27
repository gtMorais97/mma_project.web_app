export interface IDBConnector {
    RunQuery(query: string): Promise<any>
}