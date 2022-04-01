export class QueryObject {
    private query: string;
    private id: string;
    private isDescending = true;

    public constructor(query: string, id: string) {
        this.query = query;
        this.id = id;
    }

    public SetAsAscending(): QueryObject {
        this.isDescending = false;
        return this;
    }

    public GetQuery = (): string => this.query;

    public GetId = (): string => this.id;

    public IsDescending = (): boolean => this.isDescending;
}