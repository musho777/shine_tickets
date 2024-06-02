import '../../components/Slider/styles.css'
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button'
import { LocationSvg, SeansCaelndar } from '../../components/svg'
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActiveSeans } from '../../services/action/action';

export const Card = ({
    id,
    img,
    largImage,
    title,
    description,
    priceEnd,
    priceStart,
    hall,
    time,
    data,
    onClick,
    isParonyan,
    seans,
    setActiveSeans,
    imgLarg,
    place
}) => {
    const { t } = useTranslation();
    const [data1, setData1] = useState(seans)
    const [active, setActive] = useState(0)
    const [showAll, setShowAll] = useState(false)
    const divRef = useRef()
    const [hight, setHeight] = useState(0)
    const [openSeans, setOpenSeans] = useState(false)
    const [date, setDate] = useState()
    const dispatch = useDispatch()
    document.body.addEventListener('click', function () {
        setOpenSeans(false)
    });

    useEffect(() => {
        if (divRef.current) {
            const height = divRef.current.clientHeight;
            setHeight(height);
        }
    }, [description]);

    useEffect(() => {
        if (data1?.length > 0) {
            dispatch(ActiveSeans(data1[0].id))
            setActiveSeans(data1[0].id)
        }
        let date = new Date(data)
        let day = date.getDate()
        let mount = date.getMonth() + 1
        if (day < 10) {
            day = `0${day}`
        }
        if (mount < 10) {
            mount = `0${mount}`
        }
        setDate(`${day}-${mount}`)
    }, [])

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

    return <div style={{ height: hight }} className='SinglCaruselItem'>
        <div ref={divRef} className='SinglBanerDiv' >
            <div className='SiglBanerImg2'>
                <img className='SiglBanerImg2' src={windowSize.width > 960 ? img : imgLarg} />
                {data1?.length && <div className='SeansCaelndar'>
                    <div onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        setOpenSeans(true)
                    }
                    }>
                        <SeansCaelndar />
                    </div>
                    {openSeans && <div className='SeansDivMobile'>
                        {data1?.map((elm, i) => {
                            const matchResult = elm.time.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                            const day = matchResult[1];
                            const divContent = matchResult[3];
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(divContent, "text/html");
                            const divElement = doc.body.firstChild;
                            divElement.removeChild(divElement.querySelector('br'));
                            const linesArray = Array.from(divElement.childNodes)
                                .filter(node => node.nodeType === 3)
                                .map(node => node.textContent.trim());
                            const time = matchResult[5];
                            return <div onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                setActive(i)
                                dispatch(ActiveSeans(elm.id))
                                setActiveSeans(elm.id)

                            }} className='SeansDivItem'>
                                {i == active && <div className='SeansActive' />}
                                {(linesArray[1].slice(0, 3) == 'ԿԻՐ' || linesArray[1].slice(0, 3) == 'ՇԱԲ') &&
                                    <p style={{ color: 'red' }} className='WeekDey'>{linesArray[1].slice(0, 3)}</p>
                                }
                                <p className='WeekDey'>{linesArray[1].slice(0, 3)}</p>
                                <p>{day} {linesArray[0]}</p>
                                <p className='WeekDey'>{time}</p>
                            </div>
                        })}
                    </div>}
                </div>}
            </div>
            <div className='SinglBanerDivInfo'>
                <div className='SinglBanerPrimera'>
                    <div className='SinglPrimera'>
                        <p className='SinglPrimerap'>{t('Primera')}</p>
                        {isParonyan ?
                            <p id="paronyan" className='SinglPrimeraDate' dangerouslySetInnerHTML={{ __html: data }} /> :
                            <p className='SinglPrimeraDate'>{date} {time}</p>
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
                        {isParonyan ?
                            <p id="paronyan" className='PrimeraDate' dangerouslySetInnerHTML={{ __html: data }} /> :
                            <p className='PrimeraDate'>{date} {time}</p>
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
                            onClick={onClick}
                            title={t('BuyNow')} />
                    </div>
                </div>

            </div>
            {data1?.length > 0 && <div className='SeansDiv'>
                {data1?.map((elm, i) => {
                    const matchResult = elm.time.match(/(\d+)([\s\S]*?)(<div[\s\S]*?<\/div>)([\s\S]*?)(\d+:\d+)/);
                    const day = matchResult[1];
                    const divContent = matchResult[3];
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(divContent, "text/html");
                    const divElement = doc.body.firstChild;
                    divElement.removeChild(divElement.querySelector('br'));
                    const linesArray = Array.from(divElement.childNodes)
                        .filter(node => node.nodeType === 3)
                        .map(node => node.textContent.trim());
                    const time = matchResult[5];
                    return <div onClick={() => {
                        setActive(i)
                        dispatch(ActiveSeans(elm.id))
                        setActiveSeans(elm.id)
                    }} id={active == i ? 'SeansDivItemActive' : ''} className='SeansDivItem'>
                        {i == active && <div className='SeansActive' />}
                        {(linesArray[1].slice(0, 3) == 'ԿԻՐ' || linesArray[1].slice(0, 3) == 'ՇԱԲ') &&
                            <p style={{ color: 'red' }} className='WeekDey'>{linesArray[1].slice(0, 3)}</p>
                        }
                        <p className='WeekDey'>{linesArray[1].slice(0, 3)}</p>
                        <p>{day} {linesArray[0]}</p>
                        <p className='WeekDey'>{time}</p>
                    </div>
                })}
            </div>}
        </div>
        <img
            className='SinglBanerImg'
            src={largImage}
            alt='#'
        />
    </div>
}