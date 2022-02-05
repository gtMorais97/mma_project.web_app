import { significantStrikesId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getMaxSignificantStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  significant_strikes_per_fight.significant_strikes_landed as "max"
        FROM significant_strikes_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_strikes_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_strikes_per_fight.opponent_id

        WHERE significant_strikes_per_fight.significant_strikes_landed = (SELECT MAX(significant_strikes_landed) from significant_strikes_per_fight)
        `
    return makeValueObject(significantStrikesId, max[0])
}



export async function getMaxes_striking(prisma) {
    const maxes = [
        await getMaxSignificantStrikes(prisma)
    ]

    return maxes
}