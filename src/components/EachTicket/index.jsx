import './style.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { LocationSvg } from '../svg'

export const EachTicket = ({
    data,
    marginTrue,
    location,
    location_en,
    location_ru,
    title,
    title_ru,
    title_en,
    category,
    category_ru,
    category_en,
    image,
    price,
    time,
    date,
    onClick,
    hall,
    hall_ru,
    hall_en,
    place,
    place_en,
    place_ru,
}) => {
    const [languageData, setLanguageData] = useState({ title: '', location: '', categorName: '', hall: '', place: '' })
    const { language } = useSelector((st) => st.StaticReducer)
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = title
            item.location = location
            item.categorName = category
            item.hall = hall
            item.place = place
        }
        else if (language === 'en') {
            item.title = title_en
            item.location = location_en
            item.categorName = category_en
            item.hall = hall_en
            item.place = place_en
        }
        else if (language === 'ru') {
            item.title = title_ru
            item.location = location_ru
            item.categorName = category_ru
            item.hall = hall_ru
            item.place = place_ru
        }
        setLanguageData(item)
    }, [language, data])

    return (
        <div className='ticket' id={marginTrue ? 'left' : ''} onClick={onClick}>
            <div className='TicketInfodiv'>
                <div className='TicketInfo'>
                    <div>
                        <p className='ticketTitle'>{languageData.title}</p>
                        <p className='TicketData'>{date} {time}</p>
                    </div>
                    <div>
                        <div className='TicketTeater'>
                            <LocationSvg />
                            <p>{languageData.location}</p>
                        </div>
                        <div className='TicketTeater'>

                            <p>{languageData.place} {languageData.hall} </p>
                        </div>
                    </div>
                    <p className='TicketPrice'>{price}</p>
                </div>
                <div className='TicketInfoLine' />
            </div>
            <div className='TicketInfodivMobile'>
                <div className='TicketInfo'>
                    <p className='TicketData'>{date}</p>
                    <p className='ticketTitle'>{languageData.title}</p>
                    <div>
                        <div className='TicketTeater'>
                            <LocationSvg />
                            <p>{languageData.location}</p>
                        </div>
                        <div className='TicketTeater'>
                            <p>{languageData.place} {languageData.hall} </p>
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