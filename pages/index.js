import Head from 'next/head'

import { useEffect, useState } from "react";
import { Dropdown } from 'rsuite';
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
  const buttonStyle = 'text-lg font-semibold p-1 pb-2 mx-3 text-white hover:outline outline-cyan-900 outline-4 focus:outline rounded-xl'
  const currentYear = new Date().getFullYear()
  return (
    <div>
      <Head>
        <title>Last Event Ranks</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icon-192x192.png " />
      </Head>

      <div className=' bg-neutral-900'>
        <nav className=" flow-root items-center justify-between p-5 ">
          <div className=" items-center text-white mr-6">
            <span className="font-semibold text-3xl sm:text-2xl font-mono flow-left">
              last event <span className=" rounded-xl bg-cyan-900 pb-1 px-1">ranks</span>
            </span>
            <span className=' font-extralight float-right mt-1 hover:text-cyan-700'>
              <a href='https://www.patreon.com/lasteventranks?fan_landing=true' target="_blank">🥰 Support me 🥰</a>
            </span>
          </div>
        </nav>
        <div className='flex justify-center mt-5 mb-2 text-3xl sm:text-2xl text-white font-mono'>
          <h1>{timeRanks[fastestFinishesId].content[0].event}</h1>
        </div>
        <div className='flex justify-center mt-5 mb-2'>


          <div className=' grid-flow-row-dense grid-cols-3 font-mono max-w-screen-lg'>

            <button className={buttonStyle} onClick={() => { setRankType(rankTypes.STRIKING) }} >
              Striking
            </button>
            <button className={buttonStyle} onClick={() => { setRankType(rankTypes.GRAPPLING) }} >
              Grappling
            </button>
            <button className={buttonStyle} onClick={() => { setRankType(rankTypes.TIME) }} >
              Time
            </button>
          </div>


        </div>
        {
          currentRanks.hasOwnProperty(totalsFilter) &&
          <div className='flex justify-center mb-2'>
            <div className=' grid-flow-row-dense grid-cols-2 font-mono max-w-screen-lg'>
              <button className={buttonStyle} onClick={() => { setFilter(totalsFilter); setRankSelector(undefined) }}>
                Total
              </button>
              <button className={buttonStyle} onClick={() => { setFilter(perMinuteFilter); setRankSelector(undefined) }}>
                per Minute
              </button>
            </div>
          </div>
        }
        <div className=' flex justify-center font-mono text-white'>
          <Dropdown title="Select Rank"
            onSelect={(eventKey) => {
              setRankSelector(eventKey)
            }}
          >
            <Dropdown.Item eventKey={undefined}>All</Dropdown.Item>
            {
              currentRanks.hasOwnProperty(totalsFilter) ?
                Object.keys(currentRanks[currentFilter]).map(rankId =>
                  <Dropdown.Item eventKey={rankId}>{rankId}</Dropdown.Item>
                )
                :
                Object.keys(currentRanks).map(rankId =>
                  <Dropdown.Item eventKey={rankId}>{rankId}</Dropdown.Item>
                )
            }
          </Dropdown>
        </div>

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
    </div>
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