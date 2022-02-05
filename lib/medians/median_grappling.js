import { takedownsId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getMedianTakedowns(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY total_takedowns) as "median" 
            FROM(
                SELECT SUM(rounds.takedowns_landed) as total_takedowns
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(takedownsId, median[0])
}



export async function getMedians_grappling(prisma) {
    const medians = [
        await getMedianTakedowns(prisma)
    ]

    return medians
}