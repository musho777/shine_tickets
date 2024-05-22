import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'
import { MD5 } from 'crypto-js'
import axios from 'axios'

const ParonyanPoqr = ({ grupID, eventId, Timeline, secion, id, sessionID, pading, open, value }) => {
    const dispatch = useDispatch()
    const [coordinatesState, setCoordinatesState] = useState([])
    const [activeTicket, setActiveTicket] = useState({})
    const [position, setPosition] = useState({ x: '', y: '' })
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [seatArr, setSeatArr] = useState([])


    let a = [
        { Id: '68', Row: '3', Seat: '24', Price: '2500', active: false },
        { Id: '67', Row: '3', Seat: '23', Price: '2500', active: false },
        { Id: '66', Row: '3', Seat: '22', Price: '2500', active: false },
        { Id: '65', Row: '3', Seat: '21', Price: '2500', active: false },
        { Id: '64', Row: '3', Seat: '20', Price: '2500', active: false },
        { Id: '63', Row: '3', Seat: '19', Price: '4000', active: false },
        { Id: '62', Row: '3', Seat: '18', Price: '4000', active: false },
        { Id: '61', Row: '3', Seat: '17', Price: '4000', active: false },
        { Id: '60', Row: '3', Seat: '16', Price: '4000', active: false },
        { Id: '59', Row: '3', Seat: '15', Price: '4000', active: false },
        { Id: '58', Row: '3', Seat: '14', Price: '4000', active: false },
        { Id: '57', Row: '3', Seat: '13', Price: '2500', active: false },
        { Id: '56', Row: '3', Seat: '12', Price: '2500', active: false },
        { Id: '55', Row: '3', Seat: '11', Price: '2500', active: false },
        { Id: '54', Row: '3', Seat: '10', Price: '2500', active: false },
        { Id: '53', Row: '3', Seat: '9', Price: '2500', active: false },
        { Id: '52', Row: '3', Seat: '8', Price: '2500', active: false },
        { Id: '51', Row: '3', Seat: '7', Price: '2500', active: false },
        { Id: '50', Row: '3', Seat: '6', Price: '2500', active: false },
        { Id: '49', Row: '3', Seat: '5', Price: '2500', active: false },
        { Id: '48', Row: '3', Seat: '4', Price: '2500', active: false },
        { Id: '47', Row: '3', Seat: '3', Price: '2500', active: false },
        { Id: '46', Row: '3', Seat: '2', Price: '2500', active: false },
        { Id: '45', Row: '3', Seat: '1', Price: '2500', active: false },
        { Id: '44', Row: '2', Seat: '22', Price: '2500', active: false },
        { Id: '43', Row: '2', Seat: '21', Price: '2500', active: false },
        { Id: '42', Row: '2', Seat: '20', Price: '2500', active: false },
        { Id: '41', Row: '2', Seat: '19', Price: '2500', active: false },
        { Id: '40', Row: '2', Seat: '18', Price: '2500', active: false },
        { Id: '39', Row: '2', Seat: '17', Price: '2500', active: false },
        { Id: '38', Row: '2', Seat: '16', Price: '2500', active: false },
        { Id: '37', Row: '2', Seat: '15', Price: '2500', active: false },
        { Id: '36', Row: '2', Seat: '14', Price: '2500', active: false },
        { Id: '35', Row: '2', Seat: '13', Price: '2500', active: false },
        { Id: '34', Row: '2', Seat: '12', Price: '4000', active: false },
        { Id: '33', Row: '2', Seat: '11', Price: '4000', active: false },
        { Id: '32', Row: '2', Seat: '10', Price: '4000', active: false },
        { Id: '31', Row: '2', Seat: '9', Price: '4000', active: false },
        { Id: '30', Row: '2', Seat: '8', Price: '4000', active: false },
        { Id: '29', Row: '2', Seat: '7', Price: '4000', active: false },
        { Id: '28', Row: '2', Seat: '6', Price: '2500', active: false },
        { Id: '27', Row: '2', Seat: '5', Price: '2500', active: false },
        { Id: '26', Row: '2', Seat: '4', Price: '2500', active: false },
        { Id: '25', Row: '2', Seat: '3', Price: '2500', active: false },
        { Id: '24', Row: '2', Seat: '2', Price: '2500', active: false },
        { Id: '23', Row: '2', Seat: '1', Price: '2500', active: false },
        { Id: '22', Row: '1', Seat: '22', Price: '2500', active: false },
        { Id: '21', Row: '1', Seat: '21', Price: '2500', active: false },
        { Id: '20', Row: '1', Seat: '20', Price: '2500', active: false },
        { Id: '19', Row: '1', Seat: '19', Price: '2500', active: false },
        { Id: '18', Row: '1', Seat: '18', Price: '2500', active: false },
        { Id: '17', Row: '1', Seat: '17', Price: '2500', active: false },
        { Id: '16', Row: '1', Seat: '16', Price: '2500', active: false },
        { Id: '15', Row: '1', Seat: '15', Price: '2500', active: false },
        { Id: '14', Row: '1', Seat: '14', Price: '2500', active: false },
        { Id: '13', Row: '1', Seat: '13', Price: '2500', active: false },
        { Id: '12', Row: '1', Seat: '12', Price: '2500', active: false },
        { Id: '11', Row: '1', Seat: '11', Price: '2500', active: false },
        { Id: '10', Row: '1', Seat: '10', Price: '2500', active: false },
        { Id: '9', Row: '1', Seat: '9', Price: '2500', active: false },
        { Id: '8', Row: '1', Seat: '8', Price: '2500', active: false },
        { Id: '7', Row: '1', Seat: '7', Price: '2500', active: false },
        { Id: '6', Row: '1', Seat: '6', Price: 4000, active: true },
        { Id: '5', Row: '1', Seat: '5', Price: 4000, active: true },
        { Id: '4', Row: '1', Seat: '4', Price: 4000, active: true },
        { Id: '3', Row: '1', Seat: '3', Price: 4000, active: true },
        { Id: '2', Row: '1', Seat: '2', Price: '4000', active: false },
        { Id: '1', Row: '1', Seat: '1', Price: '4000', active: false },]

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // const GetEventSeat = async () => {
    //     const keys = "hYDepOnSarMi";
    //     const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    //     const requestType = "getRow";
    //     const params = {
    //         group_id: grupID,
    //         timeline_id: Timeline,
    //         event_id: id,
    //     };
    //     const sortedParams = Object.fromEntries(Object.entries(params).sort());
    //     sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

    //     const options = {
    //         method: 'POST',
    //         url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //         },
    //         data: JSON.stringify(sortedParams),
    //     };

    //     const response = await axios(options)
    //     if (response.data.data?.Levels?.length) {
    //         setSeatArr(response.data.data?.Levels[0]?.Places)
    //     }

    // }

    // useEffect(() => {
    //     GetEventSeat()
    // }, [open])

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
        { "id": 0, "price": "", "row": 3, "section": 1, "seat": 24, parterre: true, amphitheater: false, lodge: false },
        { "id": 1, "price": "", "row": 3, "section": 1, "seat": 10, parterre: true, amphitheater: false, lodge: false },
        { "id": 2, "price": "", "row": 3, "section": 1, "seat": 9, parterre: true, amphitheater: false, lodge: false },
        { "id": 3, "price": "", "row": 3, "section": 1, "seat": 8, parterre: true, amphitheater: false, lodge: false },
        { "id": 4, "price": "", "row": 3, "section": 1, "seat": 7, parterre: true, amphitheater: false, lodge: false },
        { "id": 5, "price": "", "row": 3, "section": 1, "seat": 6, parterre: true, amphitheater: false, lodge: false },
        { "id": 6, "price": "", "row": 3, "section": 1, "seat": 5, parterre: true, amphitheater: false, lodge: false },
        { "id": 7, "price": "", "row": 3, "section": 1, "seat": 4, parterre: true, amphitheater: false, lodge: false },
        { "id": 8, "price": "", "row": 3, "section": 1, "seat": 3, parterre: true, amphitheater: false, lodge: false },
        { "id": 9, "price": "", "row": 3, "section": 1, "seat": 2, parterre: true, amphitheater: false, lodge: false },
        { "id": 10, "price": "", "row": 3, "section": 1, "seat": 1, parterre: true, amphitheater: false, lodge: false },
        { "id": 11, "price": "", "row": 3, "section": 1, "seat": 23, parterre: true, amphitheater: false, lodge: false },
        { "id": 12, "price": "", "row": 3, "section": 1, "seat": 22, parterre: true, amphitheater: false, lodge: false },
        { "id": 13, "price": "", "row": 3, "section": 1, "seat": 21, parterre: true, amphitheater: false, lodge: false },
        { "id": 14, "price": "", "row": 3, "section": 1, "seat": 20, parterre: true, amphitheater: false, lodge: false },
        { "id": 15, "price": "", "row": 3, "section": 1, "seat": 19, parterre: true, amphitheater: false, lodge: false },
        { "id": 16, "price": "", "row": 3, "section": 1, "seat": 18, parterre: true, amphitheater: false, lodge: false },
        { "id": 17, "price": "", "row": 3, "section": 1, "seat": 17, parterre: true, amphitheater: false, lodge: false },
        { "id": 18, "price": "", "row": 3, "section": 1, "seat": 16, parterre: true, amphitheater: false, lodge: false },
        { "id": 19, "price": "", "row": 3, "section": 1, "seat": 15, parterre: true, amphitheater: false, lodge: false },
        { "id": 20, "price": "", "row": 3, "section": 1, "seat": 14, parterre: true, amphitheater: false, lodge: false },
        { "id": 21, "price": "", "row": 3, "section": 1, "seat": 13, parterre: true, amphitheater: false, lodge: false },
        { "id": 22, "price": "", "row": 3, "section": 1, "seat": 12, parterre: true, amphitheater: false, lodge: false },
        { "id": 23, "price": "", "row": 3, "section": 1, "seat": 11, parterre: true, amphitheater: false, lodge: false },

        { "id": 25, "price": "", "row": 2, "section": 1, "seat": 21, parterre: true, amphitheater: false, lodge: false },
        { "id": 26, "price": "", "row": 2, "section": 1, "seat": 20, parterre: true, amphitheater: false, lodge: false },
        { "id": 27, "price": "", "row": 2, "section": 1, "seat": 19, parterre: true, amphitheater: false, lodge: false },
        { "id": 28, "price": "", "row": 2, "section": 1, "seat": 18, parterre: true, amphitheater: false, lodge: false },
        { "id": 29, "price": "", "row": 2, "section": 1, "seat": 17, parterre: true, amphitheater: false, lodge: false },
        { "id": 30, "price": "", "row": 2, "section": 1, "seat": 16, parterre: true, amphitheater: false, lodge: false },
        { "id": 31, "price": "", "row": 2, "section": 1, "seat": 15, parterre: true, amphitheater: false, lodge: false },
        { "id": 32, "price": "", "row": 2, "section": 1, "seat": 14, parterre: true, amphitheater: false, lodge: false },
        { "id": 33, "price": "", "row": 2, "section": 1, "seat": 13, parterre: true, amphitheater: false, lodge: false },
        { "id": 34, "price": "", "row": 2, "section": 1, "seat": 12, parterre: true, amphitheater: false, lodge: false },
        { "id": 35, "price": "", "row": 2, "section": 1, "seat": 11, parterre: true, amphitheater: false, lodge: false },
        { "id": 36, "price": "", "row": 2, "section": 1, "seat": 10, parterre: true, amphitheater: false, lodge: false },
        { "id": 37, "price": "", "row": 2, "section": 1, "seat": 9, parterre: true, amphitheater: false, lodge: false },
        { "id": 38, "price": "", "row": 2, "section": 1, "seat": 8, parterre: true, amphitheater: false, lodge: false },
        { "id": 39, "price": "", "row": 2, "section": 1, "seat": 7, parterre: true, amphitheater: false, lodge: false },
        { "id": 40, "price": "", "row": 2, "section": 1, "seat": 6, parterre: true, amphitheater: false, lodge: false },
        { "id": 41, "price": "", "row": 2, "section": 1, "seat": 5, parterre: true, amphitheater: false, lodge: false },
        { "id": 42, "price": "", "row": 2, "section": 1, "seat": 4, parterre: true, amphitheater: false, lodge: false },
        { "id": 43, "price": "", "row": 2, "section": 1, "seat": 3, parterre: true, amphitheater: false, lodge: false },
        { "id": 44, "price": "", "row": 2, "section": 1, "seat": 2, parterre: true, amphitheater: false, lodge: false },
        { "id": 45, "price": "", "row": 2, "section": 1, "seat": 1, parterre: true, amphitheater: false, lodge: false },
        { "id": 24, "price": "", "row": 2, "section": 1, "seat": 22, parterre: true, amphitheater: false, lodge: false },


        { "id": 46, "price": "", "row": 1, "section": 1, "seat": 22, parterre: true, amphitheater: false, lodge: false },
        { "id": 47, "price": "", "row": 1, "section": 1, "seat": 21, parterre: true, amphitheater: false, lodge: false },
        { "id": 48, "price": "", "row": 1, "section": 1, "seat": 20, parterre: true, amphitheater: false, lodge: false },
        { "id": 49, "price": "", "row": 1, "section": 1, "seat": 19, parterre: true, amphitheater: false, lodge: false },
        { "id": 50, "price": "", "row": 1, "section": 1, "seat": 18, parterre: true, amphitheater: false, lodge: false },
        { "id": 51, "price": "", "row": 1, "section": 1, "seat": 17, parterre: true, amphitheater: false, lodge: false },
        { "id": 52, "price": "", "row": 1, "section": 1, "seat": 16, parterre: true, amphitheater: false, lodge: false },
        { "id": 53, "price": "", "row": 1, "section": 1, "seat": 15, parterre: true, amphitheater: false, lodge: false },
        { "id": 54, "price": "", "row": 1, "section": 1, "seat": 14, parterre: true, amphitheater: false, lodge: false },
        { "id": 55, "price": "", "row": 1, "section": 1, "seat": 13, parterre: true, amphitheater: false, lodge: false },
        { "id": 56, "price": "", "row": 1, "section": 1, "seat": 12, parterre: true, amphitheater: false, lodge: false },
        { "id": 57, "price": "", "row": 1, "section": 1, "seat": 11, parterre: true, amphitheater: false, lodge: false },
        { "id": 58, "price": "", "row": 1, "section": 1, "seat": 10, parterre: true, amphitheater: false, lodge: false },
        { "id": 59, "price": "", "row": 1, "section": 1, "seat": 9, parterre: true, amphitheater: false, lodge: false },
        { "id": 60, "price": "", "row": 1, "section": 1, "seat": 8, parterre: true, amphitheater: false, lodge: false },
        { "id": 61, "price": "", "row": 1, "section": 1, "seat": 7, parterre: true, amphitheater: false, lodge: false },
        { "id": 62, "price": "", "row": 1, "section": 1, "seat": 6, parterre: true, amphitheater: false, lodge: false },
        { "id": 63, "price": "", "row": 1, "section": 1, "seat": 5, parterre: true, amphitheater: false, lodge: false },
        { "id": 64, "price": "", "row": 1, "section": 1, "seat": 4, parterre: true, amphitheater: false, lodge: false },
        { "id": 65, "price": "", "row": 1, "section": 1, "seat": 3, parterre: true, amphitheater: false, lodge: false },
        { "id": 66, "price": "", "row": 1, "section": 1, "seat": 2, parterre: true, amphitheater: false, lodge: false },
        { "id": 67, "price": "", "row": 1, "section": 1, "seat": 1, parterre: true, amphitheater: false, lodge: false },
    ])

    useEffect(() => {
        let item = [...seansArr]
        seatArr?.map((elm, i) => {
            let index = item.findIndex((e) => (e.row == elm.Row && e.seat == elm.Seat))
            item[index].price = elm?.Price
            item[index].active = elm?.active
        })

        setSeansArr(item)
    }, [secion])


    const getPrice = (y, i, x, parterre, amphitheater, lodge) => {
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

    const addTicket = (i, price, id, parterre, amphitheater, lodge) => {
        let data = [...coordinatesState]
        data[i].active = !data[i].active
        let item = {}
        let temp = seansArr.find((elm) => elm.id === i)
        if (windowSize.width <= 768) {
            setShowModal(true)
            setTimeout(() => {
                setShowModal(false)
            }, 5000)
            item = {
                row: temp.row,
                price: temp.price,
                seat: temp.seat,
                seatId: i,
                sessionId: sessionID,
                parterre: temp.parterre,
                amphitheater: temp.amphitheater,
                lodge: temp.lodge,
                eventId: eventId,
                stage: item.stage,
            }
        }
        else {
            item = activeTicket
        }
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
        image.src = require('../../assets/ParonyanPoqr.png')

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

                    if (r >= 100 && g <= 30 && b <= 30) {
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
                alt='' src={require('../../assets/ParonyanPoqr.png')} />
            {coordinatesState?.map((e, i) => {
                if (seansArr[i].active)
                    return <button
                        key={i}
                        onMouseOver={() => {
                            getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
                            setActiveButton(i)
                        }}
                        style={
                            {
                                top: e?.y - 4,
                                left: e?.x - 4,
                                // backgroundColor: e.active && 'green'
                                backgroundColor: tickets.find((elm) => elm.seatId == e.id) && 'green'
                            }
                        }
                        id='seatStyle'
                        className={[
                            i == activeButton ? 'activeButton' : '',
                            e.active ? "addTicketButton" : '']}
                        onMouseLeave={() => {
                            setShowModal(false)
                            setActiveButton(null)
                        }}
                        onClick={() => addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)}
                        onTouchStart={() => {
                            getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                            setActiveButton(i)
                        }}
                        onTouchEnd={() => {
                            addTicket(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge)
                        }}
                    />
            })}

            {showModal &&
                <div style={{ top: position.y, left: position.x, position: 'absolute', value, transform: `scale(${1 / (value.scale + 0.5)})` }} className='parter'>
                    <p className='Teatertext'>շարք {activeTicket.row}</p>
                    <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                    <p className='Teatertext'>{activeTicket.price} դրամ</p>
                </div>
            }
        </div>
    )
}
export default ParonyanPoqr
