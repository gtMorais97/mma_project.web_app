import * as rankConstants from "../RankConstants";
import { makeRankObject, rankTypes } from "../utils";
import { IDBConnector } from "../../db_connection/IDBConnector";
import { QueryObject } from "../common/QueryObject";
import { LastEventQueryObjects } from "./lastEventRanksQueryObjects";

export class lastEventRanksGetter {

    public static async getLastEventRanks(dbConnector: IDBConnector) {

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
        ] = await Promise.all(LastEventQueryObjects.GetLastEventQueryObjects().map(queryObject => this.getRank(dbConnector, queryObject)))

        return {
            [rankTypes.STRIKING]: {
                [rankConstants.totalsFilter]: {
                    [rankConstants.significantStrikesId]: significantStrikesRank,
                    [rankConstants.knockdownsId]: knockdownsRank,
                    [rankConstants.headStrikesId]: headStrikesRank,
                    [rankConstants.bodyStrikesId]: bodyStrikesRank,
                    [rankConstants.legStrikesId]: legStrikesRank,
                    [rankConstants.distanceStrikesId]: distanceStrikesRank,
                },
                [rankConstants.perMinuteFilter]: {
                    [rankConstants.significantStrikesPerMinuteId]: significantStrikesPerMinuteRank,
                    [rankConstants.distanceStrikesPerMinuteId]: distanceStrikesPerMinuteRank,
                    [rankConstants.headStrikesPerMinuteId]: headStrikesPerMinuteRank,
                    [rankConstants.bodyStrikesPerMinuteId]: bodyStrikesPerMinuteRank,
                    [rankConstants.legStrikesPerMinuteId]: legStrikesPerMinuteRank,
                }
            },
            [rankTypes.GRAPPLING]: {
                [rankConstants.totalsFilter]: {
                    [rankConstants.takedownsId]: takedownsRank,
                    [rankConstants.takedownAccuracyId]: takedownAccuracyRank,
                    [rankConstants.takedownsDefendedId]: takedownsDefendedRank,
                    [rankConstants.takedownDefenceId]: takedownDefenceRank,
                    [rankConstants.submissionAttemptsId]: subAttemptsRank,
                },
                [rankConstants.perMinuteFilter]: {
                    [rankConstants.takedownsPerMinuteId]: takedownsPerMinuteRank,
                    [rankConstants.groundStrikesPerMinuteId]: groundStrikesPerMinuteRank,
                }
            },
            [rankTypes.TIME]: {
                [rankConstants.fastestFinishesId]: fastestFinishesRank,
                [rankConstants.controlId]: controlRank,
                [rankConstants.controlPerTakedownId]: controlPerTakedownRank,
            }
        }
    }

    private static async getRank(dbConnector: IDBConnector, queryObject: QueryObject) {
        const rank = await dbConnector.RunQuery(queryObject.GetQuery());
        return makeRankObject(queryObject.GetId(), queryObject.IsDescending(), rank)
    }
}