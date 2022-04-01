import { bodyStrikesId, bodyStrikesPerMinuteId, distanceStrikesId, distanceStrikesPerMinuteId, headStrikesId, headStrikesPerMinuteId, knockdownsId, legStrikesId, legStrikesPerMinuteId, significantStrikesId, significantStrikesPerMinuteId } from "../RankConstants"
import { makeValueObject } from "../utils"

async function getMaxSignificantStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        significant_strikes_per_fight.significant_strikes_landed as "max"

        FROM significant_strikes_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_strikes_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_strikes_per_fight.opponent_id

        WHERE significant_strikes_per_fight.significant_strikes_landed = (SELECT MAX(significant_strikes_landed) from significant_strikes_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(significantStrikesId, max)
}

async function getMaxKnockdowns(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        knockdowns_per_fight.knockdowns as "max"

        FROM knockdowns_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = knockdowns_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = knockdowns_per_fight.opponent_id

        WHERE knockdowns_per_fight.knockdowns = (SELECT MAX(knockdowns) from knockdowns_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(knockdownsId, max)
}

async function getMaxHeadStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_head_per_fight.significant_head_landed as "max"

        FROM significant_head_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_head_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_head_per_fight.opponent_id

        WHERE significant_head_per_fight.significant_head_landed = (SELECT MAX(significant_head_landed) from significant_head_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(headStrikesId, max)
}

async function getMaxBodyStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_body_per_fight.significant_body_landed as "max"
        
        FROM significant_body_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_body_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_body_per_fight.opponent_id

        WHERE significant_body_per_fight.significant_body_landed = (SELECT MAX(significant_body_landed) from significant_body_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(bodyStrikesId, max)
}

async function getMaxLegStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_leg_per_fight.significant_leg_landed as "max"
        
        FROM significant_leg_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_leg_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_leg_per_fight.opponent_id

        WHERE significant_leg_per_fight.significant_leg_landed = (SELECT MAX(significant_leg_landed) from significant_leg_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(legStrikesId, max)
}

async function getMaxDistanceStrikes(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name, 
        significant_distance_per_fight.significant_distance_landed as "max"
        
        FROM significant_distance_per_fight

        JOIN fighters AS fighters1
        ON fighters1.id = significant_distance_per_fight.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = significant_distance_per_fight.opponent_id

        WHERE significant_distance_per_fight.significant_distance_landed = (SELECT MAX(significant_distance_landed) from significant_distance_per_fight)
        ORDER BY date desc
        `
    return makeValueObject(distanceStrikesId, max)
}

async function getMaxSignificantStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_strikes_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_strikes_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_strikes_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_strikes_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_strikes_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(significantStrikesPerMinuteId, max)
}

async function getMaxHeadStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_head_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_head_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_head_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_head_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_head_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(headStrikesPerMinuteId, max)
}

async function getMaxBodyStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_body_landed/(CAST(v.total_time as decimal)/60) as "max"

        FROM significant_body_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_body_landed as decimal)/v.total_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_body_landed as decimal)/v2.total_time as "value",
                v2.total_time
                FROM significant_body_per_fight as v2
                ) aux
            where aux.total_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(bodyStrikesPerMinuteId, max)
}

async function getMaxLegStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_leg_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM significant_leg_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_leg_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_leg_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM significant_leg_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(legStrikesPerMinuteId, max)
}

async function getMaxDistanceStrikesPerMinute(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.significant_distance_landed/(CAST(v.standing_time as decimal)/60) as "max"

        FROM significant_distance_per_fight as v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE CAST(v.significant_distance_landed as decimal)/v.standing_time = (
            SELECT MAX("value") FROM (
                SELECT CAST(v2.significant_distance_landed as decimal)/v2.standing_time as "value",
                v2.standing_time
                FROM significant_distance_per_fight as v2
                ) aux
            where aux.standing_time >= 60
            ) 
        ORDER BY date desc
        `
    return makeValueObject(distanceStrikesPerMinuteId, max)
}

export async function getMaxes_striking(prisma) {
    const maxes = [
        await getMaxSignificantStrikes(prisma),
        await getMaxKnockdowns(prisma),
        await getMaxHeadStrikes(prisma),
        await getMaxBodyStrikes(prisma),
        await getMaxLegStrikes(prisma),
        await getMaxDistanceStrikes(prisma),

        await getMaxSignificantStrikesPerMinute(prisma),
        await getMaxHeadStrikesPerMinute(prisma),
        await getMaxBodyStrikesPerMinute(prisma),
        await getMaxLegStrikesPerMinute(prisma),
        await getMaxDistanceStrikesPerMinute(prisma),
    ]

    return maxes
}