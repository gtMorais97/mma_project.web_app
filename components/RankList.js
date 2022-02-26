import { BarChart } from "./BarChart";
import { Rank } from "./Rank";


export function RankList({ ranks, medians, maxes }) {
    return (
        <div className="grid content-center grid-cols-1 max-w-screen-lg lg:divide-y-2">
            {
                Object.keys(ranks).map(rankId => {
                    return (
                        <div className=" grid grid-cols-2 lg:grid-cols-1 md:grid-cols-1 lg:pb-3 lg:pt-2  items-center">
                            <Rank key={rankId} rank={ranks[rankId]} />
                            <BarChart rank={ranks[rankId]} median={medians.find(m => m.id === rankId)} max={maxes[rankId]} />
                        </div>
                    )
                }
                )
            }
        </div>
    )
} 