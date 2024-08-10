import './style.css'
import { LocationSvg } from '../svg'

export const EachTicket = ({
    marginTrue,
    location,
    title,
    image,
    price,
    date,
    onClick,
}) => {

    return (
        <div className='ticket' id={marginTrue ? 'left' : ''} onClick={onClick}>
            <div className='TicketInfodiv'>
                <div className='TicketInfo'>
                    <div>
                        <p className='ticketTitle'>{title}</p>
                        <p className='TicketData'>{date}</p>
                    </div>
                    <div>
                        <div className='TicketTeater'>
                            <LocationSvg />
                            <p>{location}</p>
                        </div>
                    </div>
                    <p className='TicketPrice'>{price}</p>
                </div>
                <div className='TicketInfoLine' />
            </div>
            <img alt='' className='Ticketimg' src={image} />
        </div>
    )
}