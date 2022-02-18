import { groundStrikesPerMinuteId, perMinuteFilter, submissionAttemptsId, takedownAccuracyId, takedownDefenceId, takedownsDefendedId, takedownsId, takedownsPerMinuteId, totalsFilter } from "../RankVariables"
import { makeRankObject } from "../utils"

async function getTakedownsRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, SUM(rounds.takedowns_landed) as value, events.name as event
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) > 0
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
        `
    return makeRankObject(takedownsId, true, rank)
}

async function getTakedownAccuracyRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            CAST(SUM(rounds.takedowns_landed) AS decimal)/SUM(rounds.takedowns_attempted) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_attempted) >= 3
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
        `
    return makeRankObject(takedownAccuracyId, true, rank)
}

async function getTakedownsDefendedRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as fighter_name
        FROM    
        (
            SELECT fighters.name as opponent_name, rounds.opponent_id as fighter_id, events.name as event,
            SUM(rounds.takedowns_attempted) - SUM(rounds.takedowns_landed) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY opponent_name, rounds.opponent_id, event
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.fighter_id

        WHERE aux.value > 0
        `
    return makeRankObject(takedownsDefendedId, true, rank)
}

async function getTakedownDefenceRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as fighter_name
        FROM    
        (
            SELECT fighters.name as opponent_name, rounds.opponent_id as fighter_id, events.name as event,
            1-(CAST(SUM(rounds.takedowns_landed) as decimal)/SUM(rounds.takedowns_attempted)) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY opponent_name, rounds.opponent_id, event
            HAVING SUM(rounds.takedowns_attempted) >= 3
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.fighter_id

        WHERE aux.value > 0
        `
    return makeRankObject(takedownDefenceId, true, rank)
}

async function getSubAttemptsRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.submission_attempts) as value
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

        WHERE aux.value>0
        `
    return makeRankObject(submissionAttemptsId, true, rank)
}

async function getGroundStrikesPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.significant_ground_landed)/(CAST(SUM(rounds.control_time + rounds.controlled_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.control_time + rounds.controlled_time) > 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    return makeRankObject(groundStrikesPerMinuteId, true, rank)
}

async function getTakedownsPerMinuteRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.takedowns_landed)/(CAST(SUM(rounds.standing_time) AS DECIMAL)/60) as value
            FROM fighters

            JOIN rounds
            ON fighters.id = rounds.fighter_id

            JOIN events
            ON rounds.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)

            GROUP BY fighter_name, opponent_id, event
            HAVING SUM(rounds.takedowns_landed) >= 2 AND SUM(rounds.standing_time) >= 60
            ORDER BY value desc
            LIMIT 10
        ) aux

        JOIN fighters
        ON fighters.id = aux.opponent_id

        WHERE aux.value > 0
    `
    return makeRankObject(takedownsPerMinuteId, true, rank)
}

export async function getLastEventRanks_grappling(prisma) {
    const ranks = {
        [totalsFilter]: {
            [takedownsId]: await getTakedownsRank_LastEvent(prisma),
            [takedownAccuracyId]: await getTakedownAccuracyRank_LastEvent(prisma),
            [takedownsDefendedId]: await getTakedownsDefendedRank_LastEvent(prisma),
            [takedownDefenceId]: await getTakedownDefenceRank_LastEvent(prisma),
            [submissionAttemptsId]: await getSubAttemptsRank_LastEvent(prisma),
        },
        [perMinuteFilter]: {
            [takedownsPerMinuteId]: await getTakedownsPerMinuteRank_LastEvent(prisma),
            [groundStrikesPerMinuteId]: await getGroundStrikesPerMinuteRank_LastEvent(prisma),

        }
    }

    return ranks
}