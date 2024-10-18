import { useSelector } from "react-redux"
import { TopEvents } from "./TopEvents"
import { useTranslation } from "react-i18next"
import './styles.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const TopEventsComponent = () => {
    // const topEvents = useSelector((st) => st.topEvents)
    const topEvents = useSelector((st) => st.general)
    const { t } = useTranslation()
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return <div>
        <div className='EventTitle'>
            <h2>{t('TopEvents')}</h2>
        </div>
        {topEvents.loading ?
            <div className="TopEventWrapper">
                <Skeleton className='TopEvents' />
            </div> :
            <div className="TopEventWrapper">
                {
                    topEvents.events && topEvents.events?.map((elm, i) => {
                        let date = new Date(elm.dates[0].start_date)
                        if (i < 8)
                            return <TopEvents
                                key={i}
                                day={date.getDate()}
                                id={elm.id}
                                image={`https://dev2.shinetickets.com/${elm.main_image}`}
                                title={elm.name}
                                category={elm.category}
                                location={elm.place}
                                data={elm}
                                time={`${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`}
                                months={months[date.getMonth()]}
                                currentDayOfWeek={daysOfWeek[date.getDay()]}
                                price={`${elm.price}`}
                            />
                    })}
            </div>
        }
    </div>
}