import '../../components/Slider/styles.css'
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button'
import { LocationSvg } from '../../components/svg'
import { useEffect, useRef, useState } from 'react';

export const Card = ({
    img,
    largImage,
    title,
    description,
    priceEnd,
    priceStart,
    hall,
    date,
    onClick,
    isParonyan,
    imgLarg,
    place
}) => {
    const { t } = useTranslation();
    const divRef = useRef()
    const [hight, setHeight] = useState(0)

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

    return <div style={{ height: hight }} className='SinglCaruselItem'>
        <div ref={divRef} className='SinglBanerDiv' >
            <div className='SiglBanerImg2'>
                <img className='SiglBanerImg2' src={windowSize.width > 960 ? img : imgLarg} />
            </div>
            <div className='SinglBanerDivInfo'>
                <div className='SinglBanerPrimera'>
                    <div className='SinglPrimera'>
                        <p className='SinglPrimerap'>{t('Primera')}</p>
                        {isParonyan ?
                            <p id="paronyan" className='SinglPrimeraDate' dangerouslySetInnerHTML={{ __html: data }} /> :
                            <p className='SinglPrimeraDate'>{date}</p>
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
                            <p className='PrimeraDate'>{date}</p>
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
        </div>
        <img
            className='SinglBanerImg'
            src={largImage}
            alt='#'
        />
    </div>
}