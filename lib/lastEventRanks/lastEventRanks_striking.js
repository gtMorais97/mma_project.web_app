import { distanceStrikesId, distanceStrikesPerMinuteId, headStrikesId, knockdownsId, significantStrikesId, totalsFilter, perMinuteFilter, bodyStrikesId, legStrikesId, significantStrikesPerMinuteId, headStrikesPerMinuteId, bodyStrikesPerMinuteId, legStrikesPerMinuteId } from "../RankVariables"
import { makeRankObject } from "../utils"

async function getSignificantStrikesRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_strikes_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

    `

    return makeRankObject(significantStrikesId, true, rank)
}

async function getDistanceStrikesRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
   
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_distance_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

    `
    return makeRankObject(distanceStrikesId, true, rank)
}

async function getHeadStrikesRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_head_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

    `
    return makeRankObject(headStrikesId, true, rank)
}

async function getBodyStrikesRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_body_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

    `
    return makeRankObject(bodyStrikesId, true, rank)
}

async function getLegStrikesRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.significant_body_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

    `
    return makeRankObject(legStrikesId, true, rank)
}

async function getSignificantStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_strikes_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
    `
    return makeRankObject(significantStrikesPerMinuteId, true, rank)
}

async function getDistanceStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_distance_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
    `
    return makeRankObject(distanceStrikesPerMinuteId, true, rank)
}

async function getHeadStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_head_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
    `
    return makeRankObject(headStrikesPerMinuteId, true, rank)
}

async function getBodyStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_body_landed)/(CAST(SUM(rounds.total_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id
    `
    return makeRankObject(bodyStrikesPerMinuteId, true, rank)
}

async function getLegStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_leg_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    return makeRankObject(legStrikesPerMinuteId, true, rank)
}

async function getKnockdownsRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.knockdowns) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
        `
    return makeRankObject(knockdownsId, true, rank)
}



export async function getLastEventRanks_striking(prisma) {
    const ranks = {
        [totalsFilter]: {
            [significantStrikesId]: await getSignificantStrikesRank_LastEvent(prisma),
            [knockdownsId]: await getKnockdownsRank_LastEvent(prisma),
            [headStrikesId]: await getHeadStrikesRank_LastEvent(prisma),
            [bodyStrikesId]: await getBodyStrikesRank_LastEvent(prisma),
            [legStrikesId]: await getLegStrikesRank_LastEvent(prisma),
            [distanceStrikesId]: await getDistanceStrikesRank_LastEvent(prisma),
        },
        [perMinuteFilter]: {
            [significantStrikesPerMinuteId]: await getSignificantStrikesPerMinuteRank_LastEvent(prisma),
            [distanceStrikesPerMinuteId]: await getDistanceStrikesPerMinuteRank_LastEvent(prisma),
            [headStrikesPerMinuteId]: await getHeadStrikesPerMinuteRank_LastEvent(prisma),
            [bodyStrikesPerMinuteId]: await getBodyStrikesPerMinuteRank_LastEvent(prisma),
            [legStrikesPerMinuteId]: await getLegStrikesPerMinuteRank_LastEvent(prisma),
        }
    }

    return ranks
}