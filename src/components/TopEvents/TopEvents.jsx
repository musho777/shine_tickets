import { useTranslation } from 'react-i18next';
import { Button } from '../Button'
import { CategoryType } from '../CategoryType'
import './styles.css'
import { truncateText } from '@/src/function/function';
export const TopEvents = ({
    image,
    location,
    price,
    category,
    hall,
    id,
    day,
    months,
    time,
    currentDayOfWeek,
    place,
    title
}) => {

    const { t } = useTranslation();

    return <div className='TopEvents'>
        <div className='TypeTopDiv'>
            <CategoryType type={category?.id} name={category.name} />
        </div>
        <div className='TopEventsInfo' >
            <div className='TopEventsInfoDiv'>
                <div className='TopEventsInfoDate'>
                    <p>{day}</p>
                </div>
                <div className='TopEventsMonthAndWeek'>
                    <p className='TopEventsMonth'>{truncateText(months, 5)}</p>
                    <div className='TopEventsLine' />
                    <p className='TopEventsWeek'>{truncateText(currentDayOfWeek, 9)}</p>
                </div>
                <p className='TopEventsTime'>{time}</p>
            </div>
            <div>
                <p className='TopEventsInfoPlace'>{place} {hall}</p>
            </div>
            <div className='TopEventsInfoLine' />
            <div className='TopEventsDiv'>
                <div className='TopEventsDivDiv'>
                    <p className='TopEventsTeaterName'>{location}</p>
                    <p className='TopEventsName'>{truncateText(title, 43)}</p>
                </div>
                <p className='TopEventsPrice'>{price}</p>
            </div>
            <div className='TopEventsInfoLine2' />
            <div className='TopEventsButton'>
                <Button
                    onClick={() => { window.location = `/Single/${id}/${title}` }}
                    title={t('seeMore')} />
            </div>
        </div>
        <img alt='#' src={image} />
    </div>
}