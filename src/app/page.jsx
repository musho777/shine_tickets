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
  const getWeekEvent = useSelector((st) => st.getWeekEvent)
  const { language } = useSelector((st) => st.StaticReducer)

  useEffect(() => {
    localStorage.setItem('orderId', '')
    if (language) {
      dispatch(GetGenerealEvents(language))
    }
    dispatch(GetAllAds())
    dispatch(WeekEvetntApi())
  }, [language])
  return (
    <div className='mainPage'>
      <div className='container'>
        <Carusel />
        {/* <TopEventsComponent /> */}
      </div>
      {/* <WeekEvents /> */}
      <div className='container'>
        <ALLEvents />
        <ExpectedEvents />
      </div>
    </div>
  );
}
