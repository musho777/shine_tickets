import { useTranslation } from 'react-i18next'
import { Card } from './card'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { GetExpectedEvents } from '../../services/action/action'
export const ExpectedEvents = () => {
    const getExpectedEvents = useSelector((st) => st.getExpectedEvents)
    const { language } = useSelector((st) => st.StaticReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetExpectedEvents())
    }, [])
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const { t } = useTranslation()
    return <div className='ExpectedEvents'>
        {getExpectedEvents?.events?.length > 0 &&
            <div className='EventTitle'>
                <h2>{t('ՍՊԱՍՎՈՂ ՄԻՋՈՑԱՌՈՒՄՆԵՐ')}</h2>
            </div>
        }
        <div className='CardDiv'>
            {getExpectedEvents?.events?.length > 0 && getExpectedEvents?.events?.map((elm, i) => {
                let month = ''
                let title = ''
                let weekday = ''
                let location = ''
                let description = ''
                let category = ''
                if (language == 'am') {
                    month = elm.month
                    title = elm.title
                    weekday = elm.weekday
                    location = elm.location
                    description = elm.description
                    category = elm.category.name
                }
                else if (language == 'ru') {
                    month = elm.month_ru
                    title = elm.title_ru
                    weekday = elm.weekday_ru
                    location = elm.location_ru
                    description = elm.description_ru
                    category = elm.category.name_ru
                }
                else {
                    month = elm.month_en
                    title = elm.title_en
                    weekday = elm.weekday_en
                    location = elm.location_en
                    description = elm.description_en
                    category = elm.category.name_en
                }
                return <Card
                    month={month}
                    time={elm.time}
                    day={elm.day}
                    title={title}
                    categoryType={elm._id}
                    img={elm.image}
                    location={location}
                    weekday={weekday}
                    category={category}
                    description={description}
                    priceRange={elm.priceRange}
                />
            })}
        </div>
    </div>
}