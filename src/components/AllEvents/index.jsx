import './styles.css'
import { useEffect, useState } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetAllEvents2 } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'
import { truncateText } from '@/src/function/function'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ALLEvents = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { language } = useSelector((st) => st.StaticReducer)
    const events = useSelector((st) => st.getAllEventes)

    useEffect(() => {
        if (language) {
            dispatch(GetAllEvents2(1, language))
        }
    }, [language])
    return (
        <div>
            <div className='EventTitle'>
                <h2>{t('AllEvents')}</h2>
            </div>
            {events.loading ?
                <Skeleton height={202} className='ticket' /> :
                <div className="Allevents">
                    {events.events && events.events?.map((elm, i) => {
                        if (elm.active)
                            return (
                                <EachTicket
                                    key={i}
                                    onClick={() => window.location = `/Single/${elm.id}/${elm?.name}`}
                                    location={elm?.place}
                                    hall={elm?.hall}
                                    title={truncateText(elm.name, 43)}
                                    category={elm?.category?.name}
                                    image={`https://dev2.shinetickets.com/${elm.poster_image}`}
                                    date={elm.dates[0].start_date}
                                    price={`${elm?.price} - ${elm?.price} AMD`}
                                />
                            )
                    })}
                </div>
            }
            <ShowAllButton onClick={() => window.location = '/Category/all'} />
        </div>
    )
}