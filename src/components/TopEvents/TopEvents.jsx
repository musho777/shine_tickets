import { useTranslation } from 'react-i18next';
import { Button } from '../Button'
import { CategoryType } from '../CategoryType'
import './styles.css'
import { useDispatch } from 'react-redux';
import { SuccessSinglPage } from '../../services/action/SuccessAction';
import { truncateText } from '@/src/function/function';
export const TopEvents = ({
    image,
    location,
    data,
    price,
    category,
    hall,
    id,
    day,
    months,
    time,
    currentDayOfWeek,
    type = true,
    time2,
    place,
    title
}) => {

    const { t } = useTranslation();
    const dispatch = useDispatch()

    const handelClick = () => {
        if (!type) {
            dispatch(SuccessSinglPage({
                event: {
                    location: location,
                    location_en: 'H. Paronyan State Theater',
                    location_ru: 'A.Государственный театр Пароняна',
                    title: data?.title,
                    title_ru: data?.title_ru,
                    title_en: data?.title_en,
                    date: time2.replace(/<div[^>]*>|<\/div>|<br>/g, ''),
                    image: image,
                    id: id,
                    type: 'paronyan'
                }
            }))
            window.location = `/Single/${id}/${title}`
        }
        else {
            window.location = `/Single/${id}/${title}`
        }

    }

    return <div className='TopEvents'>
        <div className='TypeTopDiv'>
            <CategoryType type={category?._id} name={category} />
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
                    onClick={() => handelClick()}
                    title={t('seeMore')} />
            </div>
        </div>
        <img src={image} />
    </div>
}