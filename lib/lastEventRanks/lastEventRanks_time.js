import { controlId, controlPerTakedownId, fastestFinishesId } from "../RankVariables"
import { makeRankObject } from "../utils"

export async function getFastestFinishesRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM(
            SELECT fighters.name as fighter_name,
                fights.winning_fighter_id as fighter_id, 
                fights.losing_fighter_id as opponent_id, 
                (fights.ending_round_time+((fights.ending_round-1)*300)) as value,
                to_char(to_timestamp((fights.ending_round_time+((fights.ending_round-1)*300))) , 'MI:SS') as time,
                events.name as event
            FROM fighters

            JOIN fights
            ON fighters.id = fights.winning_fighter_id

            JOIN events
            ON fights.event_id = events.id

            WHERE events.date = (SELECT MAX(date) from events)
            AND (fights.ending_round_time*fights.ending_round) < 60*5*3
            order by time asc
            ) aux
        JOIN fighters
        ON fighters.id = aux.opponent_id
        `

    return makeRankObject(fastestFinishesId, false, rank)
}

export async function getControlRank_LastEvent(prisma) {
    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            SUM(rounds.control_time) as value, 
            to_char(to_timestamp(SUM(rounds.control_time)) , 'MI:SS') as time
            
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
    return makeRankObject(controlId, true, rank)
}

export async function getControlPerTakedownRank_LastEvent(prisma) {

    const rank = await prisma.$queryRaw
        `
        SELECT aux.*, fighters.name as opponent_name
        FROM    
        (
            SELECT fighters.name as fighter_name, rounds.opponent_id as opponent_id, events.name as event,
            CAST(SUM(rounds.control_time) AS DECIMAL)/SUM(rounds.takedowns_landed) as value,
            to_char(to_timestamp(CAST(SUM(rounds.control_time) AS DECIMAL)/SUM(rounds.takedowns_landed)), 'MI:SS') as time
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
    return makeRankObject(controlPerTakedownId, true, rank)
}

export async function getLastEventRanks_time(prisma) {
    const ranks = {
        [fastestFinishesId]: await getFastestFinishesRank_LastEvent(prisma),
        [controlId]: await getControlRank_LastEvent(prisma),
        [controlPerTakedownId]: await getControlPerTakedownRank_LastEvent(prisma)
    }

    return ranks
}