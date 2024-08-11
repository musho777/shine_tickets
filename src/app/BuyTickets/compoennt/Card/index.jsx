import { CalendarSvg1, LocationSvg1 } from "@/src/components/svg"
import { truncateText } from "@/src/function/function"

export const Card = ({ data, id }) => {
  return <div className='BuyTicketsCard' id={id}>
    <img src={`http://localhost:8000/${data.main_image}`} />
    <div className='BuyTicketsCardInfo'>
      <div>
        <p className='BuyTicketTitle'>{truncateText(data.name, 15)}</p>
      </div>
      <div className='BuyTicketDate'>
        <div>
          <CalendarSvg1 />
        </div>
        <p className='BuyTicketDateMonth'> {data.dates && data.dates[0].start_date.slice(5, 10)}</p>
        <div className='LineBuyTicketDate'></div>
        <p className='BuyTicketDateTime'>{data.dates && data.dates[0].start_date.slice(10, 16)}</p>
      </div>
      <div className='BuyTicketDateLocation'>
        <LocationSvg1 />
        <p>{data.place}</p>
      </div>
    </div>
  </div>
}