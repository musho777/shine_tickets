import { useEffect, useState } from 'react'
import { WeekEventSvg, WeekEventSvgM } from '../svg'
import './styles.css'
import { useSelector } from 'react-redux'
export const WeekCard = ({
    title,
    title_en,
    title_ru,
    hall,
    hall_en,
    hall_ru,
    time,
    date,
    img,
    id,
    place_en,
    place,
    place_ru
}) => {
    const [languageData, setLanguageData] = useState({ title: '', location: '', hall: '', place: '' })
    const { language } = useSelector((st) => st.StaticReducer)
    const [dateTime, setDate] = useState('')
    function truncateText(text, lang = 10) {
        if (text?.length > 13) {
            return text.substring(0, lang) + '...';
        } else {
            return text;
        }
    }

    useEffect(() => {
        let item = { ...languageData }
        let datee = new Date(date)
        let day = datee.getDate()
        let mount = datee.getMonth() + 1
        if (day < 10) {
            day = `0${day}`
        }
        if (mount < 10) {
            mount = `0${mount}`
        }
        setDate(`${day}.${mount}`)


        if (language === 'am') {
            item.title = title
            item.hall = hall
            item.place = place
        }
        else if (language === 'en') {
            item.title = title_en
            item.hall = hall_en
            item.place = place_en

        }
        else if (language === 'ru') {
            item.title = title_ru
            item.hall = hall_ru
            item.place = place_ru
        }
        setLanguageData(item)
    }, [language])
    return <div onClick={() => {
        window.location = `/Single/${id}/${title}`
    }} className='WeekCard'>
        <div className='WeekCardImg'>
            <img src={img} />
        </div>
        <div className='WeekcardIfno'>
            <p className='WeekcardIfnoTitle'>{truncateText(languageData.title)}</p>
            <p className='WeekCardDate'>
                {dateTime} {time}
            </p>
            <p className='WeekCardPlace'>{truncateText(languageData.hall)} {truncateText(languageData.place, 30)}</p>
        </div>
        <div className='WeekcardLine' />
        <div className='WeekcardLineSvg'>
            <WeekEventSvg />
        </div>
        <div className='WeekcardLineSvgM'>
            <WeekEventSvgM />
        </div>
    </div>
}