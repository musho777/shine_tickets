import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import { CategoryType } from '../CategoryType'
import { LocationSvg } from '../svg'

import './styles.css'
export const Card = ({
    month,
    time,
    title,
    weekday,
    location,
    description,
    day,
    priceRange,
    img,
    category,
    categoryType
}) => {
    const { t } = useTranslation();
    return <div className='ExpectedEventsDiv'>
        <div className='TypeDiv'>
            <CategoryType type={categoryType} name={category} />
        </div>
        <div className='ExpectedEventsInfo'>
            <div className='dateAndLocation'>
                <div className='expectedDate'>
                    <div className='dayDate'>
                        <p>{day}</p>
                    </div>
                    <div className='monthAndWeek'>
                        <p className='monthp'>{month}</p>
                        <div className='monthLine' />
                        <p className='weekp'>{weekday}</p>
                    </div>
                    <p className='expectTime'>{time}</p>
                </div>
                <div className='dateAndLocationLine' />
                <div className='LocationDiv'>
                    <LocationSvg />
                    <p>{location}</p>
                </div>
            </div>
            <div className='ExpectedEventInfo'>
                <p className='eventType'>{description}</p>
                <p className='eventName'>{title}</p>
            </div>
            <div className='MobilePrice'>
                <p>{priceRange} AMD</p>
            </div>
            <div className='ExpectedEventLine' />
            <div className='ExpectedEventPrice'>
                <p>{priceRange} AMD</p>
                {/* <Button title={t('BuyNow')} /> */}
            </div>
        </div>
        <img src={`https://api.shinetickets.com/images/${img}`} />
    </div>
}