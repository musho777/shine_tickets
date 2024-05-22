import './styles.css'
import { useEffect } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetAllEvents2, GetRandomEvents } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'

export const ALLEvents = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getAllEventes)
    function truncateText(text) {
        if (text?.length > 43) {
            return text.substring(0, 43) + '...';
        }
        else {
            return text;
        }
    }

    useEffect(() => {
        dispatch(GetAllEvents2(1))
    }, [])

    return (
        <div>
            <div className='EventTitle'>
                <h2>{t('AllEvents')}</h2>
            </div>
            <div className="Allevents">
                {events.events?.events?.length > 0 && events.events?.events?.map((elm, i) => {
                    const dateObject = new Date(elm?.date)
                    let day = dateObject.getDate()
                    let month = dateObject.getMonth() + 1
                    if (day <= 9) {
                        day = `0${day}`
                    }
                    if (month <= 9) {
                        month = `0${month}`
                    }
                    if (i < 9 && elm._id != "65d222f051424e16acf10852" && elm._id != "6623a4dae2a7c6d067e2d78b" && elm._id != "6617eb278f4fa9f36077dbd4") {
                        return (
                            <EachTicket
                                key={i}
                                id={elm._id}
                                onClick={() => window.location = `/Single/${elm.eventId._id}/${elm?.eventId?.title}`}
                                location={elm?.hallId?.location}
                                location_en={elm?.hallId?.location_en}
                                location_ru={elm?.hallId?.location_ru}
                                hall={elm?.hallId?.hall}
                                hall_en={elm?.hallId?.hall_en}
                                hall_ru={elm?.hallId?.hall_ru}
                                place={elm?.hallId?.place}
                                place_en={elm?.hallId?.place_en}
                                plave_ru={elm?.hallId?.place_ru}
                                title={truncateText(elm.eventId?.title)}
                                title_ru={truncateText(elm.eventId?.title_ru)}
                                title_en={truncateText(elm.eventId?.title_en)}
                                category_en={elm?.eventId?.category?.name_en}
                                category_ru={elm?.eventId?.category?.name_ru}
                                category={elm?.eventId?.category?.name}
                                image={` https://api.shinetickets.com/images/${elm.eventId?.largeImage}`}
                                date={`${day}.${month} ${elm?.time}`}
                                price={`${elm?.priceStart} - ${elm?.priceEnd} AMD`}
                            />
                        )
                    }
                })}

            </div>
            <div className="ShowAllButtonWrappr">
                <ShowAllButton onClick={() => window.location = '/allEvents'} />
            </div>
        </div>
    )
}