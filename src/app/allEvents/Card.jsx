import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SuccessSinglPage } from '../../services/action/SuccessAction';
import { Button } from '../../components/Button';
import { CategoryType } from '../../components/CategoryType';
import { truncateText } from '@/src/function/function';
export const Card = ({
  image,
  location,
  data,
  price,
  category,
  id,
  day,
  months,
  time,
  currentDayOfWeek,
  type = true,
  time2,
  title,
  place,
  date
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

  return <div className='TopEvents' id={'AllEventsWrapperCard'}>
    <div className='TypeTopDiv'>
      <CategoryType type={category?._id} name={category} />
    </div>
    <div className='TopEventsInfo' id={'AllEventsInfo'}>
      <div className='TopEventsInfoDiv'>
        <div className='TopEventsInfoDate'>
          <p>{day}</p>
        </div>
        <div className='TopEventsMonthAndWeek'>
          <p className='TopEventsMonth'>{months}</p>
          <div className='TopEventsLine' />
          <p className='TopEventsWeek'>{currentDayOfWeek}</p>
        </div>
        <p className='TopEventsTime'>{time}</p>
      </div>
      <div>
        <p className='TopEventsInfoPlace'>{place}</p>
      </div>
      <div className='TopEventsInfoLine' />
      <div className='TopEventsDiv'>
        <div className='TopEventsDivDiv'>
          <p className='TopEventsTeaterName'>{location}</p>
          <p className='TopEventsName'>{truncateText(title, 40)}</p>
        </div>
        <p className='TopEventsPrice'>{price}</p>
      </div>
      <div className='TopEventsInfoLine2' />
      <div className='TopEventsButton'>
        <Button
          onClick={() => handelClick()}
          title={t('BuyNow')} />
      </div>
    </div>
    <div className='AllEventsCardWrapper'>
      <img src={image} />
      <div className='AllEventsCardWrapperInfo'>
        <p className='AllEventsCardWrapperInfoTitle'>{truncateText(title, 43)}</p>
        <p className='AllEventsCardWrapperInfoTitleDate'>{date}</p>
        <p className='AllEventsCardWrapperInfoTitleDateTeter'> {place}</p>
      </div>
    </div>
  </div>
}