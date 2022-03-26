import { stringify } from "querystring"

export function makeRankObject(id, descending, rank) {
    return {
        id: id,
        descending: descending,
        content: rank
    }
}

export function makeValueObject(id, value) {
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
