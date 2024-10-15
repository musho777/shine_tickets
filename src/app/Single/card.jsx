import '../../components/Slider/styles.css'
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button'
import { LocationSvg } from '../../components/svg'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export const Card = ({
    img,
    largImage,
    title,
    description,
    priceEnd,
    priceStart,
    hall,
    imgLarg,
    place,
    dates,
    id
}) => {
    const { t } = useTranslation();
    const divRef = useRef()
    const [hight, setHeight] = useState(0)
    const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekdayAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [activeEvent, setActiveEvent] = useState(0)
    const [calendar, setCalendar] = useState(false)
    useEffect(() => {
        if (divRef.current) {
            const height = divRef.current.clientHeight;
            setHeight(height);
        }
    }, [description]);


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
    console.log(dates)

    return <div style={{ height: hight }} className='SinglCaruselItem'>
        <div ref={divRef} className='SinglBanerDiv' >
            {dates?.length > 1 && <div className='calendarIconeSingl' onClick={() => setCalendar(!calendar)}>
                <Image width={16} height={16} src={require('../../assets/calendarmobile.png')} />
            </div>}
            <div className='SiglBanerImg2'>
                <img className='SiglBanerImg2' src={windowSize.width > 960 ? img : imgLarg} />
            </div>
            <div className='SinglBanerDivInfo'>
                <div className='SinglBanerPrimera'>
                    <div className='SinglPrimera'>
                        <p className='SinglPrimerap'>{t('Primera')}</p>
                        {dates &&
                            <p className='SinglPrimeraDate'>{dates[activeEvent].start_date}</p>
                        }
                    </div>
                    <div className='SinglBanerLocation'>
                        <LocationSvg />
                        <p className='SinglBanerDivInfoPlace'>{hall} {place}</p>
                    </div>
                </div>
                <div>
                    <p className='SinglBanerTitle'>{title}</p>
                </div>
                <div className='SinglBanerPrimeraMobile'>
                    <div className='Primera'>
                        <p className='Primerap'>{t('Primera')}</p>
                        {dates &&
                            <p className='SinglPrimeraDate'>{dates[activeEvent].start_date}</p>
                        }
                    </div>
                    <div className='BanerLocation'>
                        <LocationSvg />
                        <p className='BanerDivInfoPlace'>{hall}</p>
                    </div>
                </div>
                <div className='SinglPriceDiv'>
                    <p className='SinglBanerPrice'>{priceStart} {priceEnd} </p>
                    <div className='SinglBanerButton'>
                        <Button
                            onClick={() => window.location = `/BuyTickets/${`${id}-${dates[activeEvent].id}`}`}
                            title={t('BuyNow')} />
                    </div>
                </div>

            </div>
        </div>
        {(dates?.length > 1 && calendar) && <div className='seansTime'>
            {dates?.map((elm, i) => {
                const date = new Date(elm.start_date);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                let hour = date.getHours();
                let min = date.getMinutes();

                const week = date.getDay();
                if (min < 10) {
                    min = `0${min}`
                }
                if (hour < 10) {
                    hour = `0${hour}`
                }
                return <div onClick={() => {
                    setCalendar(false)
                    setActiveEvent(i)
                }} key={i} id={activeEvent == i ? 'activeEvent' : ""} className='seansTimeItem'>
                    <p>{weekdayAbbr[week]}</p>
                    <p>{day} {monthAbbr[month - 1]}</p>
                    <p>{hour}:{min}</p>
                </div>
            })}
        </div>}
        <img
            className='SinglBanerImg'
            src={largImage}
            alt='#'
        />
    </div>
}