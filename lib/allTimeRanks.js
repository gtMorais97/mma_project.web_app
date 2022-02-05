import { PrismaClient } from "@prisma/client";

async function getTotalStrikesRank() {
    const prisma = new PrismaClient()

    const rank = await prisma.$queryRaw
        `
    SELECT fighters.name as fighter_name, SUM(rounds.total_strikes_landed) as value
    FROM fighters
    JOIN rounds
    ON fighters.id = rounds.fighter_id

    GROUP BY fighter_name
    ORDER BY value desc
    LIMIT 10
    `

    return {
        id: "Total Strikes",
        content: rank
    }
}

async function getSignificantStrikesRank() {
    const prisma = new PrismaClient()

    const rank = await prisma.$queryRaw
        `
    SELECT fighters.name as fighter_name, SUM(rounds.significant_strikes_landed) as value
    FROM fighters
    JOIN rounds
    ON fighters.id = rounds.fighter_id

    GROUP BY fighter_name
    ORDER BY value desc
    LIMIT 10
    `

    return {
        id: "Significant Strikes",
        content: rank
    }
}

export async function getAllTimeRanks() {

    const ranks = [
        await getSignificantStrikesRank(),
        await getKnockdownsRank()

    ]

    return ranks
}