'use client'
import { useEffect } from 'react'
import { Carusel } from '../components/Slider'
import { ALLEvents } from '../components/AllEvents'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAds, GetGenerealEvents, WeekEvetntApi } from '../services/action/action'
import { ExpectedEvents } from '../components/ExpectedEvents'
import { WeekEvents } from '../components/WeekEvents'
import { TopEventsComponent } from '../components/TopEvents'
import Head from 'next/head'


export default function Home() {
  const dispatch = useDispatch()
  const { language } = useSelector((st) => st.StaticReducer)

  useEffect(() => {
    if (language) {
      dispatch(GetGenerealEvents(language))
    }
    dispatch(GetAllAds())
  }, [language])
  return (
    <div className='mainPage'>
      <Head>
        <title>Shine Tickets</title>
      </Head>
      <div className='container'>
        <Carusel />
        <TopEventsComponent />
      </div>
      <WeekEvents />
      <div className='container'>
        <ALLEvents />
        <ExpectedEvents />
      </div>
    </div>
  );
}
