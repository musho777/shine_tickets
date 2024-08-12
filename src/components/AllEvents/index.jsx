import './styles.css'
import { useEffect } from "react"
import { EachTicket } from "../EachTicket"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { GetAllEvents2 } from "../../services/action/action"
import { ShowAllButton } from '../Button/ShowAllButton'
import { truncateText } from '@/src/function/function'

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
                                image={`http://159.89.105.14/${elm.cover_image}`}
                                date={elm.dates[0].start_date}
                                price={`${elm?.price} - ${elm?.price} AMD`}
                            />
                        )
                })}
            </div>
            <ShowAllButton onClick={() => window.location = '/allEvents'} />
        </div>
    )
}