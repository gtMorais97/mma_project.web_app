import { groundStrikesPerMinuteId, submissionAttemptsId, takedownsDefendedId, takedownsId, takedownsPerMinuteId } from "../RankConstants"
import { makeValueObject } from "../utils"

async function getMaxTakedowns(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.takedowns_landed as "max"

        FROM takedowns_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.takedowns_landed = (SELECT MAX(takedowns_landed) from takedowns_per_fight) 
        ORDER BY date desc
        `
    return makeValueObject(takedownsId, max)
}

async function getMaxTakedownsDefended(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.takedowns_defended as "max"

        FROM takedowns_defended_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.takedowns_defended = (SELECT MAX(takedowns_defended) from takedowns_defended_per_fight) 
        ORDER BY date desc
        `
    return makeValueObject(takedownsDefendedId, max)
}

async function getMaxSubmissionAttempts(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.submission_attempts as "max"

        FROM submissions_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.submission_attempts = (SELECT MAX(submission_attempts) from submissions_per_fight) 
        ORDER BY date desc
        `
    return makeValueObject(submissionAttemptsId, max)
}

async function getMaxTakedownsPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.takedowns_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM takedowns_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.takedowns_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.takedowns_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM takedowns_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(takedownsPerMinuteId, max)
}

async function getMaxGroundStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_ground_landed/(CAST(v.grappling_time as decimal)/60) as "max"

        FROM significant_ground_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_ground_landed as decimal)/v.grappling_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_ground_landed as decimal)/v2.grappling_time as "value",
                v2.grappling_time
                FROM significant_ground_per_fight as v2
                ) aux
            where aux.grappling_time >= 60
            ) 
        AND v.grappling_time > 0

         
        ORDER BY date desc
        `
    return makeValueObject(groundStrikesPerMinuteId, max)
}

export async function getMaxes_grappling(prisma) {
    const maxes = [
        await getMaxTakedowns(prisma),
        await getMaxTakedownsDefended(prisma),
        await getMaxSubmissionAttempts(prisma),
        await getMaxTakedownsPerMinute(prisma),
        await getMaxGroundStrikesPerMinute(prisma),
    ]

    return maxes
}