import { controlId, controlPerTakedownId, fastestFinishesId } from "../RankVariables"
import { makeValueObject } from "../utils"

async function getFastestFinish(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        rounds.total_time as "max"

        FROM rounds

        JOIN fighters AS fighters1
        ON fighters1.id = rounds.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = rounds.opponent_id

        JOIN fights
        ON fights.id = rounds.fight_id and rounds.fighter_id = fights.winning_fighter_id

        WHERE rounds.total_time = (SELECT MIN(total_time) 
								   from (select total_time, round_number from rounds where rounds.fighter_id != 1739 and rounds.opponent_id != 1739) r2
								   
								   WHERE r2.round_number=1) 
        AND rounds.round_number=1
        `
    var maxObject = makeValueObject(fastestFinishesId, max)
    maxObject.isTimeValue = true
    maxObject.suffix = "seconds"
    return maxObject
}

async function getMaxControlTime(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.control_time as "max",
        to_char(to_timestamp(v.control_time) , 'MI:SS') as time

        FROM control_per_fight v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.control_time = (SELECT MAX(control_time) from control_per_fight v2)         
        `
    var maxObject = makeValueObject(controlId, max)
    maxObject.isTimeValue = true
    maxObject.showAsTimeStamp = true
    return maxObject
}

async function getMaxControlPerTadedown(prisma) {
    const max = await prisma.$queryRaw
        `
        SELECT fighters1.name as fighter_name, fighters2.name as opponent_name,  
        v.control_per_takedown as "max",
        to_char(to_timestamp(v.control_per_takedown) , 'MI:SS') as time

        FROM control_per_takedown_per_fight v

        JOIN fighters AS fighters1
        ON fighters1.id = v.fighter_id

        JOIN fighters AS fighters2
        ON fighters2.id = v.opponent_id

        WHERE v.control_per_takedown = (SELECT MAX(control_per_takedown) from control_per_takedown_per_fight v2)
        `
    var maxObject = makeValueObject(controlPerTakedownId, max)
    maxObject.isTimeValue = true
    maxObject.showAsTimeStamp = true
    return maxObject
}

export async function getMaxes_time(prisma) {
    const maxes = [
        await getFastestFinish(prisma),
        await getMaxControlTime(prisma),
    ]

    return maxes
}