import React from "react";
export function Menu({
    buttonStyle,
    setRankType,
    currentRanks,
    totalsFilter,
    setFilter,
    setRankSelector,
    currentRanks,
    perMinuteFilter, rankTypes
}) {
    return <>
        <div className='flex justify-center mt-5 mb-2'>
            <div className=' grid-flow-row-dense grid-cols-3 font-mono max-w-screen-lg '>

                <button className={buttonStyle} onClick={() => {
                    setRankType(rankTypes.STRIKING);
                }}>
                    Striking
                </button>
                <button className={buttonStyle} onClick={() => {
                    setRankType(rankTypes.GRAPPLING);
                }}>
                    Grappling
                </button>
                <button className={buttonStyle} onClick={() => {
                    setRankType(rankTypes.TIME);
                }}>
                    Time
                </button>
            </div>


        </div>
        {currentRanks.hasOwnProperty(totalsFilter) && <div className='flex justify-center mb-2'>
            <div className=' grid-flow-row-dense grid-cols-2 font-mono max-w-screen-lg'>
                <button className={buttonStyle} onClick={() => {
                    setFilter(totalsFilter);
                    setRankSelector(undefined);
                }}>
                    Total
                </button>
                <button className={buttonStyle} onClick={() => {
                    setFilter(perMinuteFilter);
                    setRankSelector(undefined);
                }}>
                    per Minute
                </button>
            </div>
        </div>}
    </>;
}
