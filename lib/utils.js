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
        content: value
    }
}
