import { useTranslation } from "react-i18next"
import { WeekCard } from "./card"
import { ShowAllButton } from "../Button/ShowAllButton"
import { LeftSvg, RightSvg } from "../svg"
import { useSelector } from "react-redux"

export const WeekEvents = () => {
    const { t } = useTranslation()
    const getWeekEvent = useSelector((st) => st.general)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return <div className="WeekEvents">
        <div className="container">
            <div className='WeekEventTitle'>
                <h2>{t('WEEKLYEVENTS')}</h2>
                <div className="WeekArrow">
                    <RightSvg />
                    <LeftSvg />
                </div>
            </div>
            <div className="WeekCardWrapper">
                {getWeekEvent.events.map((elm, i) => {
                    const date = new Date(elm.dates[0].start_date)
                    const currentDate = new Date();
                    const timeDifference = date - currentDate;
                    const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    if (differenceInDays <= 7)
                        return <div key={i}>
                            <WeekCard
                                key={i}
                                date={elm.dates[0].start_date}
                                id={elm.id}
                                img={`https://dev2.shinetickets.com/${elm.main_image}`}
                                title={elm.name}
                                category={elm.category}
                                place={elm.place}
                                data={elm}
                                time={`${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`}
                                months={months[date.getMonth()]}
                                currentDayOfWeek={daysOfWeek[date.getDay()]}
                                price={`${elm.price}`}
                            />
                        </div>
                })
                }
            </div>
            {getWeekEvent.events > 8 &&
                <ShowAllButton onClick={() => window.location = '/allWeekEvents'} />
            }
        </div>
    </div>
}