"use client"
import '../styles.css'

import { useEffect, useState } from 'react'
import { PuffLoader } from 'react-spinners'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { GetSinglPage } from '../../../services/action/action'
import { TopEvents } from '../../../components/TopEvents/TopEvents'
import { Card } from '../card'
import DynamicMeta from '@/src/components/DinamicMetaData'

const Single = ({ params }) => {
    const dispatch = useDispatch()
    const id = params.id[0]
    const { t } = useTranslation();
    const getSinglPage = useSelector((st) => st.getSinglPage)
    const { language } = useSelector((st) => st.StaticReducer)
    let { event } = getSinglPage?.events
    let { recomended } = getSinglPage?.events
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [languageData, setLanguageData] = useState({ title: '', description: '', hall: '', place: '' })
    useEffect(() => {
        dispatch(GetSinglPage(id))
    }, [])
    useEffect(() => {
        let item = { ...languageData }
        if (language === 'am') {
            item.title = event?.title
            item.description = event?.description
            item.hall = event?.sessions[0]?.hallId.place
            item.place = event?.sessions[0]?.hallId.hall
        }
        else if (language === 'en') {
            item.title = event?.title_en
            item.description = event?.description_en
            item.hall = event?.sessions[0]?.hallId?.place_en
            item.place = event?.sessions[0]?.hallId.hall_en
        }
        else if (language === 'ru') {
            item.title = event?.title_ru
            item.description = event?.description_ru
            item.hall = event?.sessions[0]?.hallId?.place_ru
            item.place = event?.sessions[0]?.hallId.hall_ru
        }
        setLanguageData(item)
    }, [language, event])


    if (getSinglPage.loading) {
        return (
            <div className='container'>
                <div className='loading'>
                    <PuffLoader color="#FEE827" />
                </div>
            </div>
        )
    }
    return (
        <>
            <DynamicMeta title={event?.title_en} description={event?.description_en} />
            <div id='singlPage' className='container'>
                <Card
                    time={event?.sessions[0]?.time}
                    img={`https://api.shinetickets.com/images/${getSinglPage.events.event?.image}`}
                    imgLarg={`https://api.shinetickets.com/images/${getSinglPage.events.event?.largeImage}`}
                    id={id}
                    data={event?.sessions[0]?.date}
                    description={languageData?.description}
                    title={languageData?.title}
                    priceEnd={`${event?.sessions[0]?.priceEnd} AMD`}
                    priceStart={`${event?.sessions[0]?.priceStart} -`}
                    hall={languageData?.hall}
                    place={languageData?.place}
                    onClick={() => window.location = `/BuyTickets/${id}`}
                    largImage={
                        getSinglPage.events.event?.largeImage ? `https://api.shinetickets.com/images/${getSinglPage.events.event?.largeImage}` :
                            `https://api.shinetickets.com/images/${getSinglPage.events.event?.image}`

                    }
                />
                {languageData?.description?.length > 0 && <div className='DescriptionDiv'>
                    <p className='descriptionDiv2Title'>{t('description')}</p>
                    <p>{languageData?.description}</p>
                </div>}
                <div className='RecDiv2'>
                    {
                        recomended?.length > 0 &&
                        <div className='EventTitle'>
                            <h2>{t('RecommendTickets')}</h2>
                            <div className='RecDiv'>
                                {recomended.map((elm, i) => {
                                    const dateObject = new Date(elm.sessions[0]?.date);
                                    let day = dateObject.getDate();
                                    let month = dateObject.getMonth();
                                    var currentDayOfWeek = daysOfWeek[dateObject.getDay()];
                                    if (elm?.sessions?.length)
                                        if (elm._id != "65d21c1851424e16acf107d4")
                                            return <TopEvents
                                                key={i}
                                                id={elm?._id}
                                                image={`https://api.shinetickets.com/images/${elm?.image}`}
                                                title={elm?.title}
                                                category={elm?.category}
                                                day={day}
                                                location={elm?.sessions[0]?.hallId?.location}
                                                location_en={elm?.sessions[0]?.hallId?.location_en}
                                                location_ru={elm?.sessions[0]?.hallId?.location_ru}
                                                data={elm}
                                                time={elm?.sessions[0]?.time}
                                                months={months[month]}
                                                currentDayOfWeek={currentDayOfWeek}
                                                price={`${elm.sessions[0]?.priceStart} - ${elm.sessions[0]?.priceEnd} AMD`}
                                            />
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Single
