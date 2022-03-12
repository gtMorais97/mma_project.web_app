import React from "react";
export function RankTypeSwitch({
    rankTypes,
    setRankType,
    radioStyle
}) {
    return <div className='flex justify-center mt-7 mb-2'>
        <div className="inline-flex overflow-hidden rounded-lg border-cyan-900 border-2">

            <label for="striking" class="cursor-pointer">
                <input type="radio" name="ranktype" id="striking" class="sr-only peer" defaultChecked onClick={() => {
                    setRankType(rankTypes.STRIKING);
                }} />
                <span class={radioStyle}>
                    Striking
                </span>
            </label>
            <label for="grappling" class="cursor-pointer">
                <input type="radio" name="ranktype" id="grappling" class="sr-only peer" onClick={() => {
                    setRankType(rankTypes.GRAPPLING);
                }} />
                <span class={radioStyle}>
                    Grappling
                </span>
            </label>
            <label for="time" class="cursor-pointer">
                <input type="radio" name="ranktype" id="time" class="sr-only peer" onClick={() => {
                    setRankType(rankTypes.TIME);
                }} />
                <span class={radioStyle}>
                    Time
                </span>
            </label>
        </div>
    </div>;
}
