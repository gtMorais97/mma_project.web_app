import React from "react";
export function Footer({
    currentYear
}) {
    return <footer className='flex justify-center font-mono text-base text-white'>
        <small>&copy; Copyright {currentYear}, Last Event Ranks</small>
    </footer>;
}
