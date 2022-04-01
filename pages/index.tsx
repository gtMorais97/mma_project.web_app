import { Footer } from '../components/Footer';
import { TimeNotice } from '../components/TimeNotice';
import { EventTitle } from '../components/EventTitle';
import { SubRankTypeSwitch } from '../components/SubRankTypeSwitch';
import { RankTypeSwitch } from '../components/RankTypeSwitch';
import { Drop } from '../components/Drop';
import { Nav } from '../components/Nav';
import { RankList } from "../components/RankList";
import Head from 'next/head'

import { useEffect, useState } from "react";

import { PrismaClient } from "@prisma/client";


import { rankTypes } from '../lib/utils';
import { fastestFinishesId, perMinuteFilter, totalsFilter } from '../lib/RankConstants';
import { lastEventRanksGetter } from '../lib/lastEventRanks/lastEventRanksGetter';
import maxes from '../savedStats/maxes.json';
import { PrismaConnector } from '../db_connection/PrismaConnector';

export default function Home({
  strikingRanks, grapplingRanks, timeRanks,
}) {

  const [currentRanks, setRanks] = useState(strikingRanks)
  const [currentMaxes, setMaxes] = useState(maxes[rankTypes.STRIKING])

  const [rankType, setRankType] = useState(undefined)
  const [currentFilter, setFilter] = useState(totalsFilter)
  const [rankSelector, setRankSelector] = useState(undefined)

  //for whenever the user changes the rank type
  useEffect(() => {
    switch (rankType) {
      case rankTypes.STRIKING:
        setRanks(strikingRanks)
        setMaxes(maxes[rankTypes.STRIKING])
        break;
      case rankTypes.GRAPPLING:
        setRanks(grapplingRanks)
        setMaxes(maxes[rankTypes.GRAPPLING])
        break;
      case rankTypes.TIME:
        setRanks(timeRanks)
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
          maxes={currentMaxes}
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
  const prismaConnector = new PrismaConnector(new PrismaClient())

  const lastEventRanks = await lastEventRanksGetter.getLastEventRanks(prismaConnector)
  const strikingRanks = lastEventRanks[rankTypes.STRIKING]
  const grapplingRanks = lastEventRanks[rankTypes.GRAPPLING]
  const timeRanks = lastEventRanks[rankTypes.TIME]

  return {
    props: {
      strikingRanks: strikingRanks,
      grapplingRanks: grapplingRanks,
      timeRanks: timeRanks,

      // strikingMaxes: strikingMaxes,
      // grapplingMaxes: grapplingMaxes,
      // timeMaxes: timeMaxes,
    }
  }

}