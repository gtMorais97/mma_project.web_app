export function getOpponentSurname(element) {
    return element['opponent_name'] ?
        `(vs ${element['opponent_name'].split(" ").pop()})` : //Only show the last name
        ""
}

export async function getFighterTapology(fighterNameAndNickname) {
    const query = `${fighterNameAndNickname} tapology`
    console.log(query)
    const res = await fetch(`https://api.duckduckgo.com/?q="${query}"&format=json`)
    const resJson = await res.json()
    return resJson['Results'][0].FirstUrl
}