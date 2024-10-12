import './styles.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { SliderDate } from './components/sliderDate'
import { ButtonWrapper } from './components/buttonWrapper'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const handleDragStart = (e) => e.preventDefault()

export const Carusel = () => {
    const general = useSelector((st) => st.general)
    const [data, setData] = useState([])
    useEffect(() => {
        let item = [...data]
        if (!item.length) {
            general?.events && general?.events?.map((elm, i) => {
                item.push(
                    <div key={i} className='CaruselItem'>
                        <div className='BanerDiv' >
                            <Image
                                loading="lazy"
                                width={285}
                                height={400}
                                onDragStart={handleDragStart}
                                className='BanerImg2'
                                alt={elm.name || 'Banner Image'}
                                src={`https://dev2.shinetickets.com/${elm?.main_image}`}
                            />
                            <div className='BanerDivInfo'>
                                <SliderDate hall={elm.place} date={elm.dates[0].start_date} />
                                <p className='BanerTitle'>{elm.name}</p>
                                <p className='BanerPrice'>{elm.price}-AMD</p>
                                <ButtonWrapper id={elm.id} name={elm.name} />
                            </div>
                        </div>
                        <Image
                            loading="lazy"
                            height={400}
                            width={800}
                            className='BanerImg'
                            src={`https://dev2.shinetickets.com/${elm?.main_image}`}
                            alt='#'
                            onDragStart={handleDragStart}
                        />
                    </div>
                )
            })
        }
        setData(item)
    }, [general])


    if (general.loading) {
        return <div style={{ marginBottom: 50 }}>
            <Skeleton className='CaruselLoading' style={{ borderRadius: 15 }} />
        </div>
    }
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