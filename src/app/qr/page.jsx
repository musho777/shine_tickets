"use client"
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PuffLoader } from 'react-spinners'
import { MapInteractionCSS } from 'react-map-interaction';
import axios from 'axios';

const Qr = () => {
    const handleChange = (newValue) => {
        setIsInteracting(true)
        setValue(newValue);
        setIsInteracting(true)
    };
    const [position, setPosition] = useState({ y: 0, x: 0 })
    const [isInteracting, setIsInteracting] = useState(false);
    const [data, setData] = useState()

    const [value, setValue] = useState({
        scale: 0.206,
        translation: { x: 0, y: 0 }
    });


    const getTickets = () => {
        axios.get(`https://api.shinetickets.com/getAllAttendees`).then((r) => {
            setData(r.data.attendees)
        })
    }

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
    }, [isInteracting]);

    const [coordinatesState, setCoordinatesState] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [activeButton, setActiveButton] = useState(null)
    const [loading, setLoading] = useState(true)
    const { tickets } = useSelector((st) => st.tiketsForBuy)
    const [click, setClick] = useState(isInteracting)
    const [activeTicket, setActiveTicket] = useState({})

    useEffect(() => {
        setClick(isInteracting)
    }, [isInteracting])

    useEffect(() => {
        getTickets()
    }, []);



    const getPrice = (y, i, x, price, row, id, parterre, amphitheater, lodge, section, row2) => {
        setPosition({ x, y })
        let seat = 0
        const result = coordinatesState.filter((elm) => elm.y === y);
        let index = result.findIndex((elm) => elm.x === x)
        if (y === 1665) {
            index = index + 9
        }
        if (y === 1673 && index > 8) {
            index = index + 16
        }
        if (y === 1609) {
            index = index + 19
        }
        if (y === 1617 && index > 18) {
            index = index + 9
        }
        if (y === 493) {
            index = index + 41
        }
        if (y === 330) {
            index = index + 41
        }
        seat = result.length - (result.length - index - 1)
        setActiveTicket({
            row: row,
            price: price,
            seat,
            seatId: i,
            parterre: parterre,
            amphitheater: amphitheater,
            lodge: lodge,
            section: section,
            row2: row2
        })
        setShowModal(true)
    }


    useEffect(() => {
        const image = new Image()
        image.src = require('../../assets/Redessign.png')
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)
            const imageData = ctx.getImageData(0, 0, image.width, image.height)
            const pixelData = imageData.data
            const coordinates = []
            let id = 0
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    const offset = (y * image.width + x) * 4
                    const r = pixelData[offset]
                    const g = pixelData[offset + 1]
                    const b = pixelData[offset + 2]
                    let parterre = false
                    let amphitheater = false
                    let lodge = false
                    if (r >= 100 && g <= 30 && b <= 30) {
                        id = coordinates.length
                        let row = 1
                        let row2 = 1
                        let section = 0
                        if (y === 885) {
                            row = 1
                            row2 = 1
                        }
                        else if (y === 2553) {
                            row = 2
                            row2 = 2
                        }
                        else if (y === 2497) {
                            row = 3
                            row2 = 3
                        }
                        else if (y === 2441) {
                            row = 4
                            row2 = 4
                        }
                        else if (y === 2385) {
                            row = 5
                            row2 = 5
                        }
                        else if (y === 2329) {
                            row = 6
                            row2 = 6
                        }
                        else if (y === 2273) {
                            row = 7
                            row2 = 7
                        }

                        else if (y === 2217) {
                            row = 8
                            row2 = 8

                        }
                        else if (y === 2161) {
                            row = 9
                            row2 = 9
                        }
                        else if (y === 2105) {
                            row = 10
                            row2 = 10
                        }
                        else if (y === 2005) {
                            row = 11
                            row2 = 1
                        }
                        else if (y === 1949) {
                            row = 12
                            row2 = 2
                        }
                        else if (y === 1893) {
                            row = 13
                            row2 = 3
                        }
                        else if (y === 1837) {
                            row = 14
                            row2 = 4
                        }
                        else if (y === 1781) {
                            row = 15
                            row2 = 5
                        }
                        else if (y === 1673 || y == 1665) {
                            row = 16
                            row2 = 1
                        }
                        else if (y === 1617 || y === 1609) {
                            row = 17
                            row2 = 2
                        }
                        else if (y === 1561) {
                            row = 18
                            row2 = 3
                        }
                        else if (y === 1505) {
                            row = 19
                            row2 = 4
                        }
                        else if (y === 1449) {
                            row = 20
                            row2 = 5
                        }
                        else if (y === 1293) {
                            row = 1
                            row2 = 1
                        }
                        else if (y === 1237) {
                            row = 2
                            row2 = 2
                        }
                        else if (y === 1181) {
                            row = 3
                            row2 = 3
                        }
                        else if (y === 1125) {
                            row = 4
                            row2 = 4
                        }
                        else if (y === 1069) {
                            row = 5
                            row2 = 5
                        }
                        else if (y === 1013) {
                            row = 6
                            row2 = 6

                        }
                        else if (y === 957) {
                            row = 7
                            row2 = 7

                        }
                        else if (y === 833) {
                            row = 8
                            row2 = 1
                        }
                        else if (y === 777) {
                            row = 9
                            row2 = 2
                        }
                        else if (y === 721) {
                            row = 10
                            row2 = 3
                        }
                        else if (y === 665) {
                            row = 11
                            row2 = 4
                        }
                        else if (y === 609) {
                            row = 12
                            row2 = 5
                        }
                        else if (y === 553) {
                            row = 13
                            row2 = 6
                        }
                        else if (y === 493 || y === 497) {
                            row = 14
                            row2 = 7
                        }
                        else if (y === 441) {
                            row = 15
                            row2 = 8
                        }
                        else if (y === 385) {
                            row = 16
                            row2 = 9
                        }
                        else if (y === 329 || y === 330) {
                            row = 17
                            row2 = 10
                        }
                        else if (y === 273) {
                            row = 18
                            row2 = 11
                        }
                        else if (y === 213) {
                            row = 19
                            row2 = 1
                        }
                        if ((id <= 2002 && id >= 1995) || (id <= 1958 && id >= 1950) || (id <= 1911 && id >= 1902) || (id <= 1862 && id >= 1853) || (id <= 1811 && id >= 1801) || (id <= 1759 && id >= 1749) || (id <= 1706 && id >= 1696) || (id <= 1650 && id >= 1639) || (id <= 1593 && id >= 1582) || (id <= 1536 && id >= 1525)) {
                            section = 1
                            parterre = true
                            amphitheater = false
                            lodge = false

                        }
                        else if ((id <= 2011 && id >= 2003) || (id <= 1967 && id >= 1959) || (id <= 1920 && id >= 1912) || (id <= 1871 && id >= 1863) || (id <= 1821 && id >= 1812) || (id <= 1769 && id >= 1760) || (id <= 1716 && id >= 1707) || (id <= 1661 && id >= 1651) || (id <= 1604 && id >= 1594) || (id <= 1547 && id >= 1537)) {
                            section = 2
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 2020 && id >= 2012) || (id <= 1976 && id >= 1968) || (id <= 1929 && id >= 1921) || (id <= 1880 && id >= 1872) || (id <= 1831 && id >= 1822) || (id <= 1779 && id >= 1770) || (id <= 1726 && id >= 1717) || (id <= 1672 && id >= 1662) || (id <= 1615 && id >= 1605) || (id <= 1558 && id >= 1548)) {
                            section = 3
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }

                        else if ((id <= 2029 && id >= 2021) || (id <= 1985 && id >= 1977) || (id <= 1938 && id >= 1930) || (id <= 1890 && id >= 1881) || (id <= 1841 && id >= 1832) || (id <= 1789 && id >= 1780) || (id <= 1737 && id >= 1727) || (id <= 1683 && id >= 1673) || (id <= 1626 && id >= 1616) || (id <= 1569 && id >= 1559)) {
                            section = 4
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 2037 && id >= 2030) || (id <= 1994 && id >= 1986) || (id <= 1949 && id >= 1939) || (id <= 1901 && id >= 1891) || (id <= 1852 && id >= 1842) || (id <= 1800 && id >= 1790) || (id <= 1748 && id >= 1737) || (id <= 1695 && id >= 1684) || (id <= 1638 && id >= 1627) || (id <= 1581 && id >= 1570)) {
                            section = 5
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1477 && id >= 1468) || (id <= 1420 && id >= 1410) || (id <= 1359 && id >= 1349) || (id <= 1298 && id >= 1288) || (id <= 1236 && id >= 1225)) {
                            section = 6
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1489 && id >= 1478) || (id <= 1432 && id >= 1421) || (id <= 1372 && id >= 1360) || (id <= 1311 && id >= 1299) || (id <= 1249 && id >= 1237)) {
                            section = 7
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1501 && id >= 1490) || (id <= 1444 && id >= 1433) || (id <= 1385 && id >= 1373) || (id <= 1324 && id >= 1312) || (id <= 1262 && id >= 1250)) {
                            section = 8
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1513 && id >= 1502) || (id <= 1456 && id >= 1445) || (id <= 1398 && id >= 1386) || (id <= 1337 && id >= 1325) || (id <= 1275 && id >= 1263)) {
                            section = 9
                            parterre = true
                            amphitheater = false
                            lodge = false

                        }
                        else if ((id <= 1524 && id >= 1514) || (id <= 1468 && id >= 1457) || (id <= 1409 && id >= 1399) || (id <= 1348 && id >= 1337) || (id <= 1287 && id >= 1276)) {
                            section = 10
                            parterre = true
                            amphitheater = false
                            lodge = false

                        }
                        else if ((id <= 1206 && id >= 1198) || (id <= 1152 && id >= 1143) || (id <= 1105 && id >= 1096) || (id <= 1067 && id >= 1058) || (id <= 1019 && id >= 1006)) {
                            section = 11
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1188 && id >= 1181) || (id <= 1161 && id >= 1153) || (id <= 1114 && id >= 1106) || (id <= 1076 && id >= 1068) || (id <= 1032 && id >= 1020)) {
                            section = 12
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1142 && id >= 1134) || (id <= 1197 && id >= 1189)) {
                            section = 13
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1214 && id >= 1207) || (id <= 1170 && id >= 1162) || (id <= 1123 && id >= 1115) || (id <= 1085 && id >= 1077) || (id <= 1045 && id >= 1032)) {
                            section = 14
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 1224 && id >= 1215) || (id <= 1180 && id >= 1171) || (id <= 1133 && id >= 1124) || (id <= 1095 && id >= 1086) || (id <= 1057 && id >= 1046)) {
                            section = 15
                            parterre = true
                            amphitheater = false
                            lodge = false
                        }
                        else if ((id <= 968 && id >= 964) || (id <= 925 && id >= 920) || (id <= 881 && id >= 876) || (id <= 834 && id >= 828) || (id <= 785 && id >= 778) || (id <= 734 && id >= 727) || (id <= 682 && id >= 674)) {
                            section = 16
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 984 && id >= 969) || (id <= 941 && id >= 926) || (id <= 897 && id >= 882) || (id <= 851 && id >= 835) || (id <= 802 && id >= 786) || (id <= 752 && id >= 735) || (id <= 700 && id >= 683)) {
                            section = 17
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 1000 && id >= 985) || (id <= 957 && id >= 942) || (id <= 913 && id >= 898) || (id <= 868 && id >= 852) || (id <= 819 && id >= 803) || (id <= 769 && id >= 753) || (id <= 717 && id >= 701)) {
                            section = 18
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 1005 && id >= 1001) || (id <= 963 && id >= 958) || (id <= 919 && id >= 914) || (id <= 875 && id >= 869) || (id <= 827 && id >= 820) || (id <= 777 && id >= 770) || (id <= 726 && id >= 718)) {
                            section = 19
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 644 && id >= 630) || (id <= 600 && id >= 586) || (id <= 556 && id >= 542) || (id <= 512 && id >= 498) || (id <= 456 && id >= 436) || (id <= 394 && id >= 374) || (id <= 353 && id >= 333) || (id <= 269 && id >= 249) || (id <= 208 && id >= 189) || (id <= 147 && id >= 128) || (id <= 86 && id >= 67)) {
                            section = 20
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 658 && id >= 645) || (id <= 614 && id >= 601) || (id <= 570 && id >= 557) || (id <= 526 && id >= 513) || (id <= 476 && id >= 457) || (id <= 414 && id >= 395) || (id <= 373 && id >= 354) || (id <= 290 && id >= 270) || (id <= 228 && id >= 209) || (id <= 168 && id >= 148) || (id <= 108 && id >= 87)) {
                            section = 21
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if ((id <= 673 && id >= 659) || (id <= 629 && id >= 615) || (id <= 585 && id >= 571) || (id <= 541 && id >= 527) || (id <= 497 && id >= 477) || (id <= 435 && id >= 415) || (id <= 332 && id >= 312) || (id <= 311 && id >= 291) || (id <= 248 && id >= 229) || (id <= 188 && id >= 169) || (id <= 127 && id >= 109)) {
                            section = 22
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        else if (id <= 66 && id >= 0) {
                            section = 23
                            parterre = false
                            amphitheater = true
                            lodge = false
                        }
                        let price = 0
                        coordinates.push({ x, y, active: false, id: coordinates.length, row: row, section: section, price: price, id: id, parterre: parterre, amphitheater: amphitheater, lodge: lodge, row2 })
                    }
                }
            }
            setLoading(false)
            setCoordinatesState(coordinates)
        };
    }, []);

    if (loading) {
        return <div className='loading'>
            <PuffLoader color="#FEE827" />
        </div>
    }
    return (
        <div className='Hall' style={{ height: 550 }} >
            <MapInteractionCSS
                value={value}
                onChange={handleChange}
                maxScale={1.5}
                translationBounds={
                    value.scale < 0.7 && {
                        yMin: -200 / (0.7 - value.scale),
                        yMax: 1400 / 2
                    }}
            >
                <div style={{
                    position: 'relative',
                }}>
                    <img
                        className="zoomable-image"
                        alt='' src={require('../../assets/Redessign-2.png')}
                    />
                    {coordinatesState?.map((e, i) => {
                        if (data?.find((elm) => elm.seatId == i))

                            return <button
                                key={i}
                                onMouseOver={() => {
                                    getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge, e.section, e.row2)
                                    setActiveButton(i)
                                }}
                                style={
                                    {
                                        top: e?.y - 12,
                                        left: e?.x - 124,
                                        backgroundColor: tickets?.find((elm) => elm.seatId == e.id) && '#24005C'
                                    }
                                }
                                id='seatStyle2'
                                className={[
                                    i == activeButton ? 'activeButton' : '',
                                    e.active ? "addTicketButton" : ''
                                ]
                                }
                                onMouseLeave={() => {
                                    setShowModal(false)
                                    setActiveButton(null)
                                }}
                                onTouchStart={() => {
                                    if (!click) {
                                        getPrice(e.y, i, e.x, e.price, e.row, e.id, e.parterre, e.amphitheater, e.lodge, e.section, e.row2)
                                        setActiveButton(i)
                                    }
                                }}
                            >
                                <svg width="30" height="30" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.854736 5.0903H1.58107V7.19807H0.854736V5.0903Z" fill="#1E4751" />
                                    <path d="M1.64802 7.19516H0.787724C0.701558 7.19516 0.631714 7.1253 0.631714 7.03914V6.91943C0.631714 6.83325 0.701558 6.7634 0.787724 6.7634H1.64801C1.73417 6.7634 1.80402 6.83326 1.80402 6.91943V7.03914C1.80402 7.12532 1.73419 7.19516 1.64802 7.19516ZM4.41895 5.0903H5.14534V7.19807H4.41895V5.0903Z" fill="#1E4751" />
                                    <path d="M5.08444 4.61259H0.915588V0.915744C0.915588 0.410009 1.3256 0 1.83133 0H4.16871C4.67443 0 5.08444 0.410009 5.08444 0.915744V4.61259Z" fill="#940B92" />
                                    <path d="M4.16869 0H3.42714C3.93287 0 4.34288 0.410009 4.34288 0.915744V4.61259H5.08442V0.915744C5.08442 0.410009 4.67442 0 4.16869 0ZM0.915575 5.16658V3.08606C0.915575 2.94613 0.802121 2.83267 0.662194 2.83267H0.253381C0.113454 2.83267 0 2.94612 0 3.08606V4.25101C0 4.75669 0.409896 5.16658 0.915575 5.16658Z" fill="#CE00CB" />
                                    <path d="M5.08441 5.16659V3.08607C5.08441 2.94614 5.19787 2.83267 5.33786 2.83267H5.74661C5.88653 2.83267 5.99999 2.94613 5.99999 3.08607V4.25102C5.99999 4.75669 5.59009 5.16659 5.08441 5.16659Z" fill="#940B92" />
                                    <path d="M5.12545 5.72473H0.874607C0.740444 5.72473 0.631714 5.61598 0.631714 5.48182V4.89328H5.3683V5.48182C5.3683 5.61598 5.25955 5.72471 5.12545 5.72471V5.72473Z" fill="#345863" />
                                    <path d="M5.37849 5.30899H0.621478C0.38435 5.30899 0.192139 5.11678 0.192139 4.87964C0.192139 4.50413 0.496595 4.19968 0.872117 4.19968H5.12785C5.50343 4.19968 5.80783 4.50413 5.80783 4.87966C5.80783 5.11678 5.61562 5.30899 5.37849 5.30899Z" fill="#C628C3" />
                                    <path d="M5.21228 7.19515H4.35201C4.26583 7.19515 4.19598 7.1253 4.19598 7.03913V6.91942C4.19598 6.83324 4.26584 6.7634 4.35201 6.7634H5.21228C5.29844 6.7634 5.3683 6.83325 5.3683 6.91942V7.03913C5.3683 7.12531 5.29843 7.19515 5.21228 7.19515Z" fill="#1E4751" />
                                </svg>
                            </button>
                    })}
                    {
                        showModal &&
                        <div
                            onMouseOver={(e) => {
                                setShowModal(true)
                            }}
                            onMouseLeave={() => {
                                setShowModal(false)
                            }}
                            style={{
                                top: position.y - (140 + (
                                    (value.scale < 0.69) && 20 / value.scale)), left: position.x - 150, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
                            }} className='parter'>
                            <p className='Teatertext'>շարք {activeTicket.row}</p>
                            <p className='Teatertext'>տեղ {activeTicket.seat}</p>
                        </div>
                    }
                </div >
            </MapInteractionCSS>
        </div>
    )
}

export default Qr