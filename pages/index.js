import { Drop } from './../components/Drop';
import { Nav } from './../components/Nav';
import Head from 'next/head'

import { useEffect, useState } from "react";

import { RankList } from "./../components/RankList";
import { getLastEventRanks_striking } from '../lib/lastEventRanks/lastEventRanks_striking';
import { getLastEventRanks_grappling } from '../lib/lastEventRanks/lastEventRanks_grappling';
import { getLastEventRanks_time } from '../lib/lastEventRanks/lastEventRanks_time';

import { PrismaClient } from "@prisma/client";
import { getMedians_grappling } from '../lib/medians/median_grappling';
import { getMedians_striking } from '../lib/medians/median_striking';
import { getMedians_time } from '../lib/medians/median_time';
import { getMaxes_striking } from '../lib/maxes/maxes_striking';
import { fastestFinishesId, perMinuteFilter, totalsFilter } from '../lib/RankVariables';
import { getMaxes_grappling } from '../lib/maxes/maxes_grappling';
import { getMaxes_time } from '../lib/maxes/maxes_time';
import maxes from '../savedStats/maxes.json'


export default function Home({
  strikingRanks, grapplingRanks, timeRanks,
  strikingMedians, grapplingMedians, timeMedians
}) {

  const rankTypes = Object.freeze({
    STRIKING: "striking",
    GRAPPLING: "grappling",
    TIME: "time"
  })

  const [currentRanks, setRanks] = useState(strikingRanks)
  const [currentMedians, setMedians] = useState([])
  const [currentMaxes, setMaxes] = useState(maxes[rankTypes.STRIKING])

  const [rankType, setRankType] = useState(undefined)
  const [currentFilter, setFilter] = useState(totalsFilter)
  const [rankSelector, setRankSelector] = useState(undefined)

  useEffect(() => {
    switch (rankType) {
      case rankTypes.STRIKING:
        setRanks(strikingRanks)
        setMedians(strikingMedians)
        setMaxes(maxes[rankTypes.STRIKING])
        break;
      case rankTypes.GRAPPLING:
        setRanks(grapplingRanks)
        setMedians(grapplingMedians)
        setMaxes(maxes[rankTypes.GRAPPLING])
        break;
      case rankTypes.TIME:
        setRanks(timeRanks)
        setMedians(timeMedians)
        setMaxes(maxes[rankTypes.TIME])
        break;
    }
    setFilter(totalsFilter)
    setRankSelector(undefined)
  }, [rankType])



  // Promise.all(ranks.map(async (rank) => {
  //   Promise.all(rank.content.map(async (element) => {
  //     element.tapology = await getFighterTapology(element.fighter_name)
  //   }))
  // }))
  const radioStyle = 'relative inline-flex items-center h-full py-2 pr-3 pl-3 space-x-2 font-mono text-white text-lg sm:text-base peer-checked:bg-cyan-900 hover:bg-cyan-900'
  const currentYear = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>Last Event Ranks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon-192x192.png " />
      </Head>

      <div className=' bg-neutral-900'>
        <Nav />

        <div className='flex justify-center mt-5 mb-2 text-2xl text-white font-mono font-semibold sm:text-base'>
          <h1>{timeRanks[fastestFinishesId].content[0].event}</h1>
        </div>

        <div className='flex justify-center mt-5 mb-2'>
          <div className="inline-flex overflow-hidden rounded-lg border-cyan-900 border-2" >

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
        </div>
        {currentRanks.hasOwnProperty(totalsFilter) &&
          <div className='flex justify-center mb-4 mt-4'>
            <div className="inline-flex overflow-hidden rounded-lg border-cyan-900 border-2 " >

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
          </div>}
        <Drop setRankSelector={setRankSelector} currentRanks={currentRanks} currentFilter={currentFilter} totalsFilter={totalsFilter} />

        <div className=" flex justify-center ">
          <RankList ranks={
            currentRanks.hasOwnProperty(totalsFilter) ?
              (rankSelector ? { [rankSelector]: currentRanks[currentFilter][rankSelector] } : currentRanks[currentFilter])
              :
              (rankSelector ? { [rankSelector]: currentRanks[rankSelector] } : currentRanks)
          }
            medians={currentMedians} maxes={currentMaxes} />
        </div>

        <p className='flex justify-center font-mono text-base text-white'>
          {currentRanks.hasOwnProperty(totalsFilter) && currentFilter === perMinuteFilter &&
            "*Minimum 1 minute of total/striking/grappling time (whichever one is applicable)"
          }
        </p>
        <br />
        <footer className='flex justify-center font-mono text-base text-white'>
          <small>&copy; Copyright {currentYear}, Last UFC Ranks</small>
        </footer>
        <br />
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const strikingRanks = await getLastEventRanks_striking(prisma)
  const grapplingRanks = await getLastEventRanks_grappling(prisma)
  const timeRanks = await getLastEventRanks_time(prisma)

  const strikingMedians = []//await getMedians_striking(prisma)
  const grapplingMedians = []//await getMedians_grappling(prisma)
  const timeMedians = []//await getMedians_time(prisma)

  const strikingMaxes = await getMaxes_striking(prisma)
  const grapplingMaxes = await getMaxes_grappling(prisma)
  const timeMaxes = await getMaxes_time(prisma)

  return {
    props: {
      strikingRanks: strikingRanks,
      grapplingRanks: grapplingRanks,
      timeRanks: timeRanks,

      strikingMedians: strikingMedians,
      grapplingMedians: grapplingMedians,
      timeMedians: timeMedians,

      strikingMaxes: strikingMaxes,
      grapplingMaxes: grapplingMaxes,
      timeMaxes: timeMaxes,
    }
  }

}