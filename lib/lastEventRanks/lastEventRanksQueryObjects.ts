import * as rankConstants from "../RankConstants";
import { lastEventQueries as Queries } from "../Queries";
import { QueryObject } from "../QueryObject";

export class LastEventQueryObjects {
    private static lastEventQueryObjects: QueryObject[] = [
        new QueryObject(Queries.significantStrikesQuery, rankConstants.significantStrikesId),
        new QueryObject(Queries.knockdownsQuery, rankConstants.knockdownsId),
        new QueryObject(Queries.headStrikesQuery, rankConstants.headStrikesId),
        new QueryObject(Queries.bodyStrikesQuery, rankConstants.bodyStrikesId),
        new QueryObject(Queries.legStrikesQuery, rankConstants.legStrikesId),
        new QueryObject(Queries.distanceStrikesQuery, rankConstants.distanceStrikesId),
        new QueryObject(Queries.significantStrikesPerMinuteQuery, rankConstants.significantStrikesPerMinuteId),
        new QueryObject(Queries.distanceStrikesPerMinuteQuery, rankConstants.distanceStrikesPerMinuteId),
        new QueryObject(Queries.headStrikesPerMinuteQuery, rankConstants.headStrikesPerMinuteId),
        new QueryObject(Queries.bodyStrikesPerMinuteQuery, rankConstants.bodyStrikesPerMinuteId),
        new QueryObject(Queries.legStrikesPerMinuteQuery, rankConstants.legStrikesPerMinuteId),

        new QueryObject(Queries.takedownsQuery, rankConstants.takedownsId),
        new QueryObject(Queries.takedownAccuracyQuery, rankConstants.takedownAccuracyId),
        new QueryObject(Queries.takedownsDefendedQuery, rankConstants.takedownsDefendedId),
        new QueryObject(Queries.takedownDefenceQuery, rankConstants.takedownDefenceId),
        new QueryObject(Queries.subAttemptsQuery, rankConstants.submissionAttemptsId),
        new QueryObject(Queries.groundStrikesPerMinuteQuery, rankConstants.groundStrikesPerMinuteId),
        new QueryObject(Queries.takedownsPerMinute, rankConstants.takedownsPerMinuteId),

        new QueryObject(Queries.fastestFinishesQuery, rankConstants.fastestFinishesId).SetAsAscending(),
        new QueryObject(Queries.controlQuery, rankConstants.controlId),
        new QueryObject(Queries.controlPerTakedownQuery, rankConstants.controlPerTakedownId),
    ]

    public static GetLastEventQueryObjects = (): QueryObject[] => this.lastEventQueryObjects;
}