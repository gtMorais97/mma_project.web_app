import React from "react";
import { Dropdown } from 'rsuite';

export function Drop({
    setRankSelector,
    currentRanks,
    totalsFilter,
    currentFilter
}) {
    return <div className=' flex justify-center font-mono text-white mb-3'>
        <Dropdown title="Select Rank" onSelect={eventKey => {
            setRankSelector(eventKey);
        }}>
            <Dropdown.Item eventKey={undefined}>All</Dropdown.Item>
            {currentRanks.hasOwnProperty(totalsFilter) ? Object.keys(currentRanks[currentFilter]).map(rankId => <Dropdown.Item eventKey={rankId}>{rankId}</Dropdown.Item>) : Object.keys(currentRanks).map(rankId => <Dropdown.Item eventKey={rankId}>{rankId}</Dropdown.Item>)}
        </Dropdown>
    </div>;
}
