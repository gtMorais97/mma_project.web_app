import { Footer } from './../components/Footer';
import { TimeNotice } from './../components/TimeNotice';
import { EventTitle } from './../components/EventTitle';
import { SubRankTypeSwitch } from './../components/SubRankTypeSwitch';
import { RankTypeSwitch } from './../components/RankTypeSwitch';
import { Drop } from './../components/Drop';
import { Nav } from './../components/Nav';
import { RankList } from "./../components/RankList";
import Head from 'next/head'

import { useEffect, useState } from "react";

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

  //for whenever the user changes the rank type
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

        <EventTitle eventTitle={timeRanks[fastestFinishesId].content[0].event} />

        <RankTypeSwitch rankTypes={rankTypes} setRankType={setRankType} radioStyle={radioStyle} />

        {currentRanks.hasOwnProperty(totalsFilter) &&
          <SubRankTypeSwitch setFilter={setFilter} totalsFilter={totalsFilter} setRankSelector={setRankSelector} radioStyle={radioStyle} perMinuteFilter={perMinuteFilter} />
        }

        <Drop setRankSelector={setRankSelector} currentRanks={currentRanks} currentFilter={currentFilter} totalsFilter={totalsFilter} />

        <RankList ranks={
          currentRanks.hasOwnProperty(totalsFilter) ?
            (rankSelector ? { [rankSelector]: currentRanks[currentFilter][rankSelector] } : currentRanks[currentFilter])
            :
            (rankSelector ? { [rankSelector]: currentRanks[rankSelector] } : currentRanks)
        }
          medians={currentMedians} maxes={currentMaxes}
        />

        {currentRanks.hasOwnProperty(totalsFilter) && currentFilter === perMinuteFilter &&
          <TimeNotice />
        }
        <br />
        <Footer currentYear={currentYear} />
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