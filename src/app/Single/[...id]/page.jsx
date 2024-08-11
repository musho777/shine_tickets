"use client"
import '../styles.css'

import { useEffect, useState } from 'react'
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
        if (language && id) {
            dispatch(GetSinglPage(id, language))
        }
    }, [language])

    return (
        <>
            <DynamicMeta title={event?.title_en} description={event?.description_en} />
            <div id='singlPage' className='container'>
                <Card
                    img={`http://localhost:8000/${getSinglPage.events.main_image}`}
                    imgLarg={`http://localhost:8000/${getSinglPage.events.cover_image}`}
                    date={getSinglPage?.events?.dates && getSinglPage?.events?.dates[0].start_date}
                    description={languageData?.description}
                    title={getSinglPage.events.name}
                    priceEnd={`${getSinglPage.events.price} AMD`}
                    priceStart={`${getSinglPage.events.price} -`}
                    place={getSinglPage.events.place}
                    onClick={() => window.location = `/BuyTickets/${id}`}
                    largImage={`http://localhost:8000/${getSinglPage.events.cover_image}`}
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
