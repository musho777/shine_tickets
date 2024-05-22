import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'

const AramKhachatryan = ({ eventId, soldTickets, sessionID, pading, value, places, isInteracting, price }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [click, setClick] = useState(isInteracting)



    useEffect(() => {
        setClick(isInteracting)
    }, [isInteracting])

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

    const [seansArr, setSeansArr] = useState([
    ])

    useEffect(() => {
        if (places.length > 0) {
            setSeansArr(JSON.parse(places[0]))
        }
    }, [places])

    const [data, setData] = useState('')

    const getPrice = (y, i, x) => {
        let temp = [...data]
        if (temp.findIndex((el) => el.id == i) == -1) {
            temp.push({ "id": i, "price": "", "row": 4, "seat": temp.length + 1, parterre: false, amphitheater: true, lodge: false, stage: false },)
        }


        setData(temp)
        setPosition({ x, y })
        let item = seansArr.find((elm) => elm.id === i)
        setActiveTicket({
            row: item?.row,
            price: item?.price,
            seat: item?.seat,
            seatId: i,
            sessionId: sessionID,
            parterre: item?.parterre,
            amphitheater: item?.amphitheater,
            stage: item?.stage,
            lodge: item?.lodge,
            eventId: eventId,
        })
        setShowModal(true)
    }

    const addTicket = (i) => {
        let data = [...coordinatesState]
        let data1 = [...tickets]
        if (data1.findIndex((elm) => elm.seatId == i) < 0) {
            data[i].active = true
        }
        else {
            data[i].active = false
        }
        let item = {}
        let temp = seansArr.find((elm) => elm.id === i)
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
        }
        item = activeTicket
        if (data[i].active) {
            dispatch(SetTicketsAction(item))
        }
        else {
            dispatch(RemoveTicketsAction(item))
        }
        setCoordinatesState(data)
    }

    useEffect(() => {
        const image = new Image()
        image.src = require('../../assets/Aram-w.png')

        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)

            const imageData = ctx.getImageData(0, 0, image.width, image.height)
            const pixelData = imageData.data
            const coordinates = []

            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const offset = (y * image.width + x) * 4
                    const r = pixelData[offset]
                    const g = pixelData[offset + 1]
                    const b = pixelData[offset + 2]

                    if (r >= 100 && g <= 35 && b <= 35) {
                        coordinates.push({ x, y, active: false, id: coordinates.length })
                    }
                }
            }
            setCoordinatesState(coordinates)
        };
    }, []);

    return (
        <div >
            <img
                style={{ paddingTop: pading, paddingLeft: pading }}
                className="zoomable-image"
                alt='' src={require('../../assets/Aram.png')} />
            {coordinatesState.map((e, i) => {
                let top = -15
                let left = 10
                let roted = -75
                if (e.x >= 358 && e.x <= 566 && e.y >= 1772 && e.y <= 1956) {
                    top = -15
                    left = -4
                    roted = -70
                }
                else if ((e.x >= 386 && (e.x != 627 && e.x != 620 && e.x != 642 && e.x != 653 && e.x != 648 && e.x != 649 && e.x != 664)) && e.x <= 667 && e.y <= 1780 && (e.y > 1487 || e.y == 1475)) {
                    if (e.x != 627 || e.x != 620 || e.x != 642) {
                        top = -12
                        left = -4
                        roted = -50
                    }
                }
                else if (e.x >= 500 && e.x <= 879 && e.y >= 1269 && e.y <= 1648) {
                    top = -5
                    left = -7
                    roted = -20
                }
                else if (e.x >= 954 && (e.x <= 1332 && e.x != 1267 && e.x != 1284 && e.x != 1295 && e.x != 1311 && e.x != 1300 && e.x != 1317 && e.x != 1328 && e.x != 1309 && e.x != 1325 && e.x != 1329) && e.y >= 1267 && (e.y <= 1646 && e.y != 1596 && e.y != 1579 && e.y != 1613 && e.y != 1630 && e.y != 1622 && e.y != 1596 && e.y != 1639)) {
                    top = -3
                    left = -13
                    roted = 20
                }
                else if (e.x >= 1166 && (e.x <= 1435) && e.y >= 1372 && e.y <= 1773 && (e.x != 1424)) {
                    top = -4
                    left = -18
                    roted = 50
                }
                else if (e.x >= 1272 && e.x <= 1473 && e.y >= 1765 && e.y <= 1937) {
                    top = -8
                    left = -24
                    roted = 70
                }
                else if (e.x >= 148 && e.x <= 473 && e.y >= 1172 && e.y <= 1408) {
                    top = -7
                    left = -6
                    roted = -30
                }
                else if (e.x >= 474 && e.x <= 875 && e.y >= 914 && e.y <= 1229) {
                    top = -4
                    left = -8
                    roted = -10
                }
                else if (e.x >= 979 && e.x <= 1378 && e.y >= 913 && e.y <= 1220) {
                    top = -3
                    left = -12
                    roted = 10
                }

                else if (e.x >= 979 && e.x <= 1378 && e.y >= 913 && e.y <= 1220) {
                    top = -3
                    left = -12
                    roted = 10
                }
                else if (e.x >= 1391 && e.x <= 1704 && e.y >= 1169 && e.y <= 1405) {
                    top = -3
                    left = -14
                    roted = 25
                }

                else if (e.x >= 190 && e.x <= 315 && e.y >= 776 && e.y <= 1033) {
                    top = -18
                    left = -4
                    roted = -80
                }
                else if (e.x >= 213 && e.x <= 367 && e.y >= 471 && e.y <= 709) {
                    top = -17
                    left = -4
                    roted = -70
                }

                else if (e.x >= 359 && e.x <= 559 && e.y >= 222 && e.y <= 437) {
                    top = -8
                    left = -4
                    roted = -45
                }
                else if (e.x >= 640 && e.x <= 875 && e.y >= 96 && e.y <= 238) {
                    top = -4
                    left = -8
                    roted = -10
                }
                else if (e.x >= 936 && e.x <= 1220 && e.y >= 96 && e.y <= 230) {
                    top = -4
                    left = -12
                    roted = 15
                }
                else if (e.x >= 1279 && e.x <= 1505 && e.y >= 217 && e.y <= 427) {
                    top = -4
                    left = -16
                    roted = 40
                }
                else if (e.x >= 1477 && e.x <= 1641 && e.y >= 467 && e.y <= 695) {
                    top = -7
                    left = -24
                    roted = 70
                }
                else if (e.x >= 1543 && e.x <= 1671 && e.y >= 771 && e.y <= 1028) {
                    top = -10
                    left = -25
                    roted = 90
                }

                if (seansArr.find((e) => e.id == i)?.price && seansArr.find((e) => e.id == i)?.price > 0) {
                    if (soldTickets.findIndex((elm) => elm.id == e.id) < 0) {
                        return <button
                            key={i}
                            onMouseOver={() => {
                                getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                                setActiveButton(i)
                            }}
                            style={
                                {
                                    top: e?.y + top, left: e?.x + left,
                                    backgroundColor: tickets.find((elm) => elm.seatId == e.id) && '#24005C',
                                    transform: ` rotate(${roted}deg)`,
                                }
                            }
                            id='seatStyleAram'
                            className={[
                                i == activeButton ? 'activeButton' : '',
                                e.active ? "addTicketButton" : '']}
                            onMouseLeave={() => {
                                setShowModal(false)
                                setActiveButton(null)
                            }}
                            onClick={() => {
                                if (!click) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                            }
                            }
                            onTouchStart={() => {
                                if (!click) {
                                    getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                                    setActiveButton(i)
                                }
                                if (click) {
                                    setActiveButton(null)
                                }
                            }}
                            onTouchEnd={() => {
                                if (!click) {
                                    addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
                                }
                                if (click) {
                                    setActiveButton(null)
                                }
                            }}
                        >
                            {
                                !tickets.find((elm) => elm.seatId == e.id) &&
                                price.map((el, ind) => {
                                    if (el.price == seansArr.find((e) => e.id == i)?.price && el.active == 1) {
                                        return el.seat
                                    }
                                })
                            }
                        </button>
                    }
                }
            })}

            {showModal &&
                <div
                    onMouseEnter={() => {
                        setShowModal(true)
                    }}
                    onMouseLeave={() => {
                        setShowModal(false)
                    }}
                    style={{
                        top: position.y - 130 - (
                            (value.scale < 0.69) && 20 / value.scale), left: position.x - 40, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
                    }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>
    )
}
export default AramKhachatryan
