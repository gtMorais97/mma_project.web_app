
export function makeRankObject(id: string, descending: boolean, rank: Object) {
    return {
        id: id,
        descending: descending,
        content: rank
    }
}
//c
export function makeValueObject(id: string, value: any) {
    return {
        id: id,
        isTimeValue: false,
        showAsTimeStamp: false,
        suffix: "",
        content: value
    }
}

export const rankTypes = Object.freeze({
    STRIKING: "striking",
    GRAPPLING: "grappling",
    TIME: "time"
})
