'use client'
import { useEffect } from 'react'
import { PuffLoader } from 'react-spinners'
import { Carusel } from '../components/Slider'
import { ALLEvents } from '../components/AllEvents'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllAds, GetGenerealEvents, WeekEvetntApi } from '../services/action/action'
import { ExpectedEvents } from '../components/ExpectedEvents'
import { WeekEvents } from '../components/WeekEvents'
import { TopEventsComponent } from '../components/TopEvents'


export default function Home() {
  const dispatch = useDispatch()
  const general = useSelector((st) => st.general)
  const { getWeekEvent } = useSelector((st) => st)


  useEffect(() => {
    localStorage.setItem('orderId', '')
    dispatch(GetGenerealEvents())
    dispatch(GetAllAds())
    dispatch(WeekEvetntApi())
  }, [])
    ;

  if (general?.loading) {
    return (
      <div className='loading'>
        <PuffLoader color="#FEE827" />
      </div>
    )
  }
  return (
    <div className='mainPage'>
      <div className='container'>
        {general?.events?.length > 0 &&
          <Carusel />
        }
        <TopEventsComponent />
      </div>
      {
        getWeekEvent.events.length > 0 &&
        <WeekEvents />
      }
      <div className='container'>
        <ALLEvents />
        <ExpectedEvents />
      </div>
    </div>
  );
}
