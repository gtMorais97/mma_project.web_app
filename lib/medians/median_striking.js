import { significantStrikesId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getMedianSignificantStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY significant_strikes_landed) as "median" 
            FROM(
                SELECT SUM(rounds.significant_strikes_landed) as significant_strikes_landed
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(significantStrikesId, median[0])
}



export async function getMedians_striking(prisma) {
    const medians = [
        await getMedianSignificantStrikes(prisma)
    ]

    return medians
}