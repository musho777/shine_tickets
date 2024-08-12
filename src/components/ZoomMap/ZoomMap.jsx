import React, { useEffect, useState } from 'react';
import './styles.css';
import { MapInteractionCSS } from 'react-map-interaction';
import { useDispatch, useSelector } from 'react-redux';
import { SeatSvg } from '../svg';
import { RemoveTicketsAction, SetTicketsAction } from '@/src/services/action/action';

export const ZoomMap = ({ value, setValue, color }) => {
    const dispatch = useDispatch()
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [isInteracting, setIsInteracting] = useState(false);
    const [data, setData] = useState([])
    const getHall = useSelector((st) => st.getHall)


    useEffect(() => {
        setData(getHall?.events?.event_seats)
    }, [getHall?.events?.event_seats])
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };


    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const addTicket = (i, item) => {
        let temp = [...data]
        if (tickets.findIndex((elm) => elm.id == item.id) < 0) {
            temp[i].active = true
        }
        else {
            temp[i].active = false
        }
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
        }

        if (temp[i].active) {
            dispatch(SetTicketsAction(item))
        }
        else {
            dispatch(RemoveTicketsAction(item))
        }
        setData(temp)
    }


    const getPrice = (item) => {
        const x = parseInt(item.seat.left, 10);
        const y = parseInt(item.seat.top, 10);

        setPosition({ x: x, y: y })
        setActiveTicket({
            row: item.seat.row,
            price: item.price,
            seat: item.seat.column
        })
        setShowModal(true)
    }



    const handleChange = (newValue) => {
        setIsInteracting(true)
        setValue(newValue);
        setIsInteracting(true)
    };
    useEffect(() => {
        const interactionTimeout = 250;
        let timeoutId;
        if (isInteracting) {
            timeoutId = setTimeout(() => {
                setIsInteracting(false);
            }, interactionTimeout);
        } else {
            clearTimeout(timeoutId);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isInteracting, setValue]);
    return (
        <MapInteractionCSS
            value={value}
            onChange={handleChange}
            maxScale={1.5}
        >
            <div style={{ position: 'relative', }}>
                <img style={{ position: 'relative', }} src={`http://159.89.105.14/${getHall.events.map.background}`} />
                {data?.map((elm, i) => {
                    console.log(elm.color, color, '22')
                    if (elm.color == color || !color)
                        return <div
                            className={[
                                tickets.findIndex((el) => el.id == elm.id) < 0 ? "" : 'addTicketButton']}
                            onMouseOver={() => {
                                getPrice(elm)
                            }}
                            onMouseLeave={() => {
                                setShowModal(false)
                            }}
                            onClick={() => {
                                if (!isInteracting) {
                                    addTicket(i, elm)
                                }
                            }
                            }
                            onTouchStart={() => {
                                if (!isInteracting) {
                                    getPrice(elm)
                                }
                            }}
                            onTouchEnd={() => {
                                if (!isInteracting) {
                                    addTicket(i, elm)
                                }
                            }}


                            key={i} style={{ top: elm.seat.top, left: elm.seat.left, position: 'absolute', width: 20, height: 20, rotate: elm.seat.rotate, zIndex: 999 }}>
                            <SeatSvg color={elm.color} />

                        </div>
                })}
                {showModal &&
                    <div
                        onMouseOver={(e) => {
                            setShowModal(true)
                        }}
                        onMouseLeave={() => {
                            setShowModal(false)
                        }}
                        style={{
                            top: position.y - 120 - (
                                (value.scale < 0.69) && 20 / value.scale), left: position.x - 100, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
                        }} className='parter'>
                        <p className='Teatertext'>շարք {activeTicket.row}</p>
                        <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                        <p className='Teatertext'>{activeTicket.price} դրամ</p>
                    </div>
                }

            </div>
        </MapInteractionCSS>
    );
};

