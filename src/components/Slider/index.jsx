import './styles.css'
import { Button } from '../Button'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { LocationSvg } from '../svg'


const handleDragStart = (e) => e.preventDefault()

export const Carusel = () => {
    const general = useSelector((st) => st.general)
    const { language } = useSelector((st) => st.StaticReducer)
    const [data, setData] = useState([])
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);



    useEffect(() => {
        setData([])
    }, [language])

    useEffect(() => {
        let item = [...data]
        item = []
        if (!item.length) {
            let title = ''
            let description = ''
            let hall = ''
            let seeMore = ''
            let primera = ''
            let BuyNow = ''
            let place = ''
            general?.events?.length > 0 && general?.events?.map((elm, i) => {
                if (language === 'am') {
                    title = elm.eventId.title
                    description = elm.eventId?.description
                    primera = 'ՊՐԵՄԻԵՐԱ'
                    seeMore = 'Տեսնել ավելին'
                    BuyNow = 'Գնիր հիմա'
                    hall = elm?.hallId?.place
                    place = elm.hallId.hall
                }
                else if (language === 'en') {
                    title = elm.eventId.title_en
                    description = elm.eventId?.description_en
                    primera = 'PREMIERE'
                    seeMore = 'see more'
                    BuyNow = 'Buy Now'
                    hall = elm.hallId?.place_en
                    place = elm.hallId.hall_en
                }
                else if (language === 'ru') {
                    title = elm.eventId.title_ru
                    description = elm.eventId?.description_ru
                    primera = 'ПРЕМЬЕРА'
                    seeMore = 'узнать больше'
                    BuyNow = 'Купить сейчас'
                    hall = elm.hallId?.place_ru
                    place = elm.hallId.hall_ru
                }
                const dateObject = new Date(elm?.date)
                let dayOfWeek = dateObject.getDate()
                const year = dateObject.getFullYear()
                let month = dateObject.getMonth() + 1
                let minute = dateObject.getMinutes()
                if (dayOfWeek <= 9) {
                    dayOfWeek = `0${dayOfWeek}`
                }
                if (month <= 9) {
                    month = `0${month}`
                }

                if (minute < 9) {
                    minute = `0${minute}`
                }
                item.push(
                    <div key={i} className='CaruselItem'>
                        <div className='BanerDiv' >
                            <img
                                onDragStart={handleDragStart}
                                className='BanerImg2'
                                src={windowSize.width > 940 ? `https://api.shinetickets.com/images/${elm?.eventId?.image}` :
                                    `https://api.shinetickets.com/images/${elm?.eventId?.largeImage}`
                                }
                            />
                            <div className='BanerDivInfo'>
                                <div className='BanerPrimera'>
                                    <div className='Primera'>
                                        <p className='Primerap'>{primera}</p>
                                        <p className='PrimeraDate'>{dayOfWeek}-{month} {elm.time}</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>{hall} {place}</p>
                                    </div>
                                </div>
                                <p className='BanerTitle'>{title}</p>
                                <div className='BanerPrimeraMobile'>
                                    <div className='Primera'>
                                        <p className='Primerap'>{primera}</p>
                                        <p className='PrimeraDate'>{dayOfWeek}-{month} {elm.time}</p>
                                    </div>
                                    <div className='BanerLocation'>
                                        <LocationSvg />
                                        <p className='BanerDivInfoPlace'>{hall} {place}</p>
                                    </div>
                                </div>
                                <div className='BanerTextDiv'>
                                    {/* <p className='BanerText'>{description}</p> */}
                                </div>

                                <p className='BanerPrice'>{elm.priceStart}-{elm.priceEnd} AMD</p>
                                <div className='BanerButton'>
                                    <Button onClick={() => window.location = `/BuyTickets/${elm?.eventId?._id}`} title={BuyNow} />
                                    <p onClick={() => window.location = `/Single/${elm?.eventId?._id}/${elm?.eventId?.title}`}>{seeMore}</p>
                                </div>
                            </div>
                        </div>
                        {

                        }
                        <img
                            className='BanerImg'
                            src={`https://api.shinetickets.com/images/${elm?.eventId?.largeImage}`}
                            alt='#'
                            onDragStart={handleDragStart}
                        />
                    </div>
                )
            })
        }
        setData(item)
    }, [general.events, language, windowSize])

    return (
        <div style={{ width: '100%' }}>
            <AliceCarousel
                disableButtonsControls={true}
                autoPlay={true}
                mouseTracking
                items={data}
                infinite={true}
                touchMoveDefaultEvents
                autoPlayInterval={3500}
            />
        </div>
    );
}