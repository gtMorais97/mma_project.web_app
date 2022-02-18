import { fastestFinishesId, takedownsId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getMedianFinishTime(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY total_time) as "median" 
            FROM(
                SELECT SUM((fights.ending_round_time+((fights.ending_round-1)*300))) as total_time
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                WHERE (fights.ending_round_time*fights.ending_round) < 60*5*3

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(fastestFinishesId, median[0])
}



export async function getMedians_time(prisma) {
    const medians = [
        await getMedianFinishTime(prisma)
    ]

    return medians
}