import { getOpponentSurname } from "../lib/htmlFillers";

export function Rank({ rank }) {

    const isPerMinuteRank = rank.id.includes("per")

    //calculating the rank positions
    const isTimeRank = ("time" in rank.content[0])

    var positions = []
    var count = 1
    var current_position = 0

    if (rank.descending) {
        var current_value = Infinity
        rank.content.forEach(element => {
            if (element['value'] < current_value) {
                current_position = count
                current_value = element['value']
            }
            positions = [...positions, current_position]
            count += 1
        });
    } else {
        var current_value = -1
        rank.content.forEach(element => {
            if (element['value'] > current_value) {
                current_position = count
                current_value = element['value']
            }
            positions = [...positions, current_position]
            count += 1
        });
    }



    return (
        <div className=" p-7 bg-cyan-900  m-5 text-lg rounded-xl">
            <h2 className="text-center text-xl font-bold text-white pb-3 font-mono">
                {isPerMinuteRank ? rank.id + '*' : rank.id}
            </h2>
            <div className="table text-left text-white w-full first:text-lg">
                <div className="table-row-group ">
                    {
                        rank.content.map((element, index) =>
                            <div className="table-row text-base font-mono">
                                <div className="table-cell"> {positions[index]}. </div>
                                <div className="table-cell pr-5">
                                    {element['fighter_name']} {getOpponentSurname(element)}
                                </div>
                                <div className="table-cell">{isTimeRank ? element.time : +(element.value + Number.EPSILON).toFixed(2)}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}