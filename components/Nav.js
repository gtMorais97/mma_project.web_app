import React from "react";
export function Nav({ }) {
    return <nav className=" flow-root items-center justify-between p-5 ">
        <div className=" items-center text-white mr-6">
            <span className=" font-extrabold text-3xl sm:text-lg font-mono flow-left">
                last event <span className=" rounded-xl bg-cyan-900 pb-1 px-1">ranks</span>
            </span>
            <span className=' font-extralight float-right mt-1 hover:text-cyan-700 sm:text-xs'>
                <a href='https://www.patreon.com/lasteventranks?fan_landing=true' target="_blank">🥰 Support me 🥰</a>
            </span>
        </div>
    </nav>;
}
