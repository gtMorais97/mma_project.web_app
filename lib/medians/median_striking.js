import { bodyStrikesId, bodyStrikesPerMinuteId, distanceStrikesId, distanceStrikesPerMinuteId, headStrikesId, headStrikesPerMinuteId, legStrikesId, legStrikesPerMinuteId, significantStrikesId, significantStrikesPerMinuteId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getMedianSignificantStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_strikes_landed) as value
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(significantStrikesId, median[0])
}

async function getMedianHeadStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_head_landed) as value
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(headStrikesId, median[0])
}

async function getMedianBodyStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_body_landed) as value
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(bodyStrikesId, median[0])
}

async function getMedianLegStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_leg_landed) as value
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(legStrikesId, median[0])
}

async function getMedianDistanceStrikes(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_distance_landed) as value
                FROM rounds

                JOIN fights
                ON fights.id = rounds.fight_id

                GROUP BY fights.id
            ) aux
        `
    return makeValueObject(distanceStrikesId, median[0])
}

async function getMedianSignificantStrikesPerMinute(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_strikes_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
                FROM rounds
            ) aux
        `
    return makeValueObject(significantStrikesPerMinuteId, median[0])
}

async function getMedianHeadStrikesPerMinute(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_head_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
                FROM rounds
            ) aux
        `
    return makeValueObject(headStrikesPerMinuteId, median[0])
}

async function getMedianLegStrikesPerMinute(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_leg_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
                FROM rounds
            ) aux
        `
    return makeValueObject(legStrikesPerMinuteId, median[0])
}

async function getMedianBodyStrikesPerMinute(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_body_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
                FROM rounds
            ) aux
        `
    return makeValueObject(bodyStrikesPerMinuteId, median[0])
}

async function getMedianDistanceStrikesPerMinute(prisma) {
    const median = await prisma.$queryRaw
        `
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY value) as "median" 
            FROM(
                SELECT SUM(rounds.significant_distance_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
                FROM rounds
            ) aux
        `
    return makeValueObject(distanceStrikesPerMinuteId, median[0])
}

export async function getMedians_striking(prisma) {
    const medians = [
        await getMedianSignificantStrikes(prisma),
        await getMedianHeadStrikes(prisma),
        await getMedianBodyStrikes(prisma),
        await getMedianLegStrikes(prisma),
        await getMedianDistanceStrikes(prisma),

        await getMedianSignificantStrikesPerMinute(prisma),
        await getMedianHeadStrikesPerMinute(prisma),
        await getMedianBodyStrikesPerMinute(prisma),
        await getMedianLegStrikesPerMinute(prisma),
        await getMedianDistanceStrikesPerMinute(prisma),
    ]

    return medians
}