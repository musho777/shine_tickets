import { CalendarSvg1, LocationSvg1 } from "@/src/components/svg"
import { truncateText } from "@/src/function/function"
import { useEffect, useState } from "react"

export const Card = ({ data, id, time }) => {
  const [timeIndex, setTiemIndex] = useState(0)
  useEffect(() => {
    let index = 0
    console.log(data.dates)
    if (data.dates) {
      index = data.dates?.findIndex(elm => elm.id == time)
    }
    setTiemIndex(index)
    console.log(index, '1111')
  }, [time])
  return <div className='BuyTicketsCard' id={id}>
    <img alt="#" src={`https://dev2.shinetickets.com/${data.main_image}`} />
    <div className='BuyTicketsCardInfo'>
      <div>
        <p className='BuyTicketTitle'>{truncateText(data.name, 15)}</p>
      </div>
      <div className='BuyTicketDate'>
        <div>
          <CalendarSvg1 />
        </div>
        <p className='BuyTicketDateMonth'> {data.dates && data.dates[timeIndex]?.start_date.slice(5, 10)}</p>
        <div className='LineBuyTicketDate'></div>
        <p className='BuyTicketDateTime'>{data.dates && data.dates[timeIndex]?.start_date.slice(10, 16)}</p>
      </div>
      <div className='BuyTicketDateLocation'>
        <LocationSvg1 />
        <p>{data.place}</p>
      </div>
    </div>
  </div>
}