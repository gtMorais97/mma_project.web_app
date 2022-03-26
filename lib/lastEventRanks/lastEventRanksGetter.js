import * as rankVariables from "../RankVariables";
import * as strikingQueries from "./lastEventRanks_striking"
import * as grapplingQueries from "./lastEventRanks_grappling"
import * as timeQueries from "./lastEventRanks_time"
import { rankTypes } from "../utils";
import { time } from "console";

export async function getLastEventRanks(prisma) {
    const [
        significantStrikesRank,
        knockdownsRank,
        headStrikesRank,
        bodyStrikesRank,
        legStrikesRank,
        distanceStrikesRank,
        significantStrikesPerMinuteRank,
        distanceStrikesPerMinuteRank,
        headStrikesPerMinuteRank,
        bodyStrikesPerMinuteRank,
        legStrikesPerMinuteRank,

        takedownsRank,
        takedownAccuracyRank,
        takedownsDefendedRank,
        takedownDefenceRank,
        subAttemptsRank,
        groundStrikesPerMinuteRank,
        takedownsPerMinuteRank,

        fastestFinishesRank,
        controlRank,
        controlPerTakedownRank,
    ] = await Promise.all([
        strikingQueries.getSignificantStrikesRank_LastEvent(prisma),
        strikingQueries.getKnockdownsRank_LastEvent(prisma),
        strikingQueries.getHeadStrikesRank_LastEvent(prisma),
        strikingQueries.getBodyStrikesRank_LastEvent(prisma),
        strikingQueries.getLegStrikesRank_LastEvent(prisma),
        strikingQueries.getDistanceStrikesRank_LastEvent(prisma),
        strikingQueries.getSignificantStrikesPerMinuteRank_LastEvent(prisma),
        strikingQueries.getDistanceStrikesPerMinuteRank_LastEvent(prisma),
        strikingQueries.getHeadStrikesPerMinuteRank_LastEvent(prisma),
        strikingQueries.getBodyStrikesPerMinuteRank_LastEvent(prisma),
        strikingQueries.getLegStrikesPerMinuteRank_LastEvent(prisma),

        grapplingQueries.getTakedownsRank_LastEvent(prisma),
        grapplingQueries.getTakedownAccuracyRank_LastEvent(prisma),
        grapplingQueries.getTakedownsDefendedRank_LastEvent(prisma),
        grapplingQueries.getTakedownDefenceRank_LastEvent(prisma),
        grapplingQueries.getSubAttemptsRank_LastEvent(prisma),
        grapplingQueries.getGroundStrikesPerMinuteRank_LastEvent(prisma),
        grapplingQueries.getTakedownsPerMinuteRank_LastEvent(prisma),

        timeQueries.getFastestFinishesRank_LastEvent(prisma),
        timeQueries.getControlRank_LastEvent(prisma),
        timeQueries.getControlPerTakedownRank_LastEvent(prisma),
    ])

    return {
        [rankTypes.STRIKING]: {
            [rankVariables.totalsFilter]: {
                [rankVariables.significantStrikesId]: significantStrikesRank,
                [rankVariables.knockdownsId]: knockdownsRank,
                [rankVariables.headStrikesId]: headStrikesRank,
                [rankVariables.bodyStrikesId]: bodyStrikesRank,
                [rankVariables.legStrikesId]: legStrikesRank,
                [rankVariables.distanceStrikesId]: distanceStrikesRank,
            },
            [rankVariables.perMinuteFilter]: {
                [rankVariables.significantStrikesPerMinuteId]: significantStrikesPerMinuteRank,
                [rankVariables.distanceStrikesPerMinuteId]: distanceStrikesPerMinuteRank,
                [rankVariables.headStrikesPerMinuteId]: headStrikesPerMinuteRank,
                [rankVariables.bodyStrikesPerMinuteId]: bodyStrikesPerMinuteRank,
                [rankVariables.legStrikesPerMinuteId]: legStrikesPerMinuteRank,
            }
        },
        [rankTypes.GRAPPLING]: {
            [rankVariables.totalsFilter]: {
                [rankVariables.takedownsId]: takedownsRank,
                [rankVariables.takedownAccuracyId]: takedownAccuracyRank,
                [rankVariables.takedownsDefendedId]: takedownsDefendedRank,
                [rankVariables.takedownDefenceId]: takedownDefenceRank,
                [rankVariables.submissionAttemptsId]: subAttemptsRank,
            },
            [rankVariables.perMinuteFilter]: {
                [rankVariables.takedownsPerMinuteId]: takedownsPerMinuteRank,
                [rankVariables.groundStrikesPerMinuteId]: groundStrikesPerMinuteRank,

            }
        },
        [rankTypes.TIME]: {
            [rankVariables.fastestFinishesId]: fastestFinishesRank,
            [rankVariables.controlId]: controlRank,
            [rankVariables.controlPerTakedownId]: controlPerTakedownRank,
        }
    }
}
