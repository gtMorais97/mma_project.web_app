import React from "react";
export function SubRankTypeSwitch({
    setFilter,
    totalsFilter,
    setRankSelector,
    undefined,
    radioStyle,
    perMinuteFilter
}) {
    return <div className='flex justify-center mb-4 mt-4'>
        <div className="inline-flex overflow-hidden rounded-lg border-cyan-900 border-2 ">

            <label for="total" class="cursor-pointer">
                <input type="radio" name="subranktype" id="total" class="sr-only peer" defaultChecked onClick={() => {
                    setFilter(totalsFilter);
                    setRankSelector(undefined);
                }} />
                <span class={radioStyle}>
                    Total
                </span>
            </label>
            <label for="per Minute" class="cursor-pointer">
                <input type="radio" name="subranktype" id="per Minute" class="sr-only peer" onClick={() => {
                    setFilter(perMinuteFilter);
                    setRankSelector(undefined);
                }} />
                <span class={radioStyle}>
                    per Minute
                </span>
            </label>
        </div>
    </div>;
}
