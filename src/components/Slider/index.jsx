import './styles.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { SliderDate } from './components/sliderDate'
import { ButtonWrapper } from './components/buttonWrapper'

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
                            <img onDragStart={handleDragStart} className='BanerImg2' src={`http://159.89.105.14/${elm?.main_image}`} />
                            <div className='BanerDivInfo'>
                                <SliderDate hall={elm.place} date={elm.dates[0].start_date} />
                                <p className='BanerTitle'>{elm.name}</p>
                                <p className='BanerPrice'>{elm.price}-AMD</p>
                                <ButtonWrapper id={elm.id} name={elm.name} />
                            </div>
                        </div>
                        <img className='BanerImg' src={`http://159.89.105.14/${elm?.main_image}`} alt='#' onDragStart={handleDragStart} />
                    </div>
                )
            })
        }
        setData(item)
    }, [general.events])

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