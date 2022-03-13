import React from "react";
export function EventTitle({ eventTitle }) {
    return <div className='flex justify-center mt-5 mb-2 text-2xl text-white font-mono font-semibold sm:text-base'>
        <h1>{eventTitle}</h1>
    </div>;
}
