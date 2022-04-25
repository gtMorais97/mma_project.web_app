export function getOpponentSurname(element: Object): string {
    return element['opponent_name'] ?
        `(vs ${element['opponent_name'].split(" ").pop()})` : //Only show the last name
        ""
}

export function getLastName(fullName: string): string {
    var names = fullName.split(" ");
    var lastName = "";
    do {
        lastName = names.pop()
    } while (lastName.endsWith('.'))

    return lastName
}

export async function getFighterTapology(fighterNameAndNickname) {
    const query = `${fighterNameAndNickname} tapology`
    console.log(query)
    const res = await fetch(`https://api.duckduckgo.com/?q="${query}"&format=json`)
    const resJson = await res.json()
    return resJson['Results'][0].FirstUrl
}