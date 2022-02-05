import { BarChart } from "./BarChart";
import { Rank } from "./Rank";


export function RankList({ ranks, medians, maxes }) {
    return (
        <div className="grid content-center grid-cols-1 max-w-screen-lg">
            {
                Object.keys(ranks).map(rankId => {
                    return (
                        <div className=" grid grid-cols-2 items-center">
                            <Rank key={rankId} rank={ranks[rankId]} />
                            <BarChart rank={ranks[rankId]} median={medians.find(m => m.id === rankId)} max={maxes.find(m => m.id === rankId)} />
                        </div>
                    )
                }
                )
            }
        </div>
    )
} 