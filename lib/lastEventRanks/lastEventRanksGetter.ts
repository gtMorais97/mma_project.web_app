import * as rankVariables from "../RankConstants";
import { makeRankObject, rankTypes } from "../utils";
import { IDBConnector } from "../../db_connection/IDBConnector";
import { lastEventQueries } from "./lastEventQueries";

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
        ] = await Promise.all([
            this.getRank({ dbConnector, query: lastEventQueries.significantStrikesQuery, rankId: rankVariables.significantStrikesId }),
            this.getRank({ dbConnector, query: lastEventQueries.knockdownsQuery, rankId: rankVariables.knockdownsId }),
            this.getRank({ dbConnector, query: lastEventQueries.headStrikesQuery, rankId: rankVariables.headStrikesId }),
            this.getRank({ dbConnector, query: lastEventQueries.bodyStrikesQuery, rankId: rankVariables.bodyStrikesId }),
            this.getRank({ dbConnector, query: lastEventQueries.legStrikesQuery, rankId: rankVariables.legStrikesId }),
            this.getRank({ dbConnector, query: lastEventQueries.distanceStrikesQuery, rankId: rankVariables.distanceStrikesId }),
            this.getRank({ dbConnector, query: lastEventQueries.significantStrikesPerMinuteQuery, rankId: rankVariables.significantStrikesPerMinuteId }),
            this.getRank({ dbConnector, query: lastEventQueries.distanceStrikesPerMinuteQuery, rankId: rankVariables.distanceStrikesPerMinuteId }),
            this.getRank({ dbConnector, query: lastEventQueries.headStrikesPerMinuteQuery, rankId: rankVariables.headStrikesPerMinuteId }),
            this.getRank({ dbConnector, query: lastEventQueries.bodyStrikesPerMinuteQuery, rankId: rankVariables.bodyStrikesPerMinuteId }),
            this.getRank({ dbConnector, query: lastEventQueries.legStrikesPerMinuteQuery, rankId: rankVariables.legStrikesPerMinuteId }),

            this.getRank({ dbConnector, query: lastEventQueries.takedownsQuery, rankId: rankVariables.takedownsId }),
            this.getRank({ dbConnector, query: lastEventQueries.takedownAccuracyQuery, rankId: rankVariables.takedownAccuracyId }),
            this.getRank({ dbConnector, query: lastEventQueries.takedownsDefendedQuery, rankId: rankVariables.takedownsDefendedId }),
            this.getRank({ dbConnector, query: lastEventQueries.takedownDefenceQuery, rankId: rankVariables.takedownDefenceId }),
            this.getRank({ dbConnector, query: lastEventQueries.subAttemptsQuery, rankId: rankVariables.submissionAttemptsId }),
            this.getRank({ dbConnector, query: lastEventQueries.groundStrikesPerMinuteQuery, rankId: rankVariables.groundStrikesPerMinuteId }),
            this.getRank({ dbConnector, query: lastEventQueries.takedownsPerMinute, rankId: rankVariables.takedownsPerMinuteId }),

            this.getRank({ dbConnector, query: lastEventQueries.fastestFinishesQuery, rankId: rankVariables.fastestFinishesId, descending: false }),
            this.getRank({ dbConnector, query: lastEventQueries.controlQuery, rankId: rankVariables.controlId }),
            this.getRank({ dbConnector, query: lastEventQueries.controlPerTakedownQuery, rankId: rankVariables.controlPerTakedownId }),
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

    private static async getRank({ dbConnector, query, rankId, descending = true }: { dbConnector: IDBConnector, query: string, rankId: string, descending?: boolean }) {
        const rank = await dbConnector.RunQuery(query);
        return makeRankObject(rankId, descending, rank)
    }
}