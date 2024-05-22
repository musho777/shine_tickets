import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicketsAction, SetTicketsAction } from '../../services/action/action'

const Karendemrjyanmec = ({ eventId, soldTickets, sessionID, pading, value, places, isInteracting, price }) => {
  const dispatch = useDispatch()
  const [coordinatesState, setCoordinatesState] = useState([])
  const [activeTicket, setActiveTicket] = useState({})
  const [position, setPosition] = useState({ x: '', y: '' })
  const [showModal, setShowModal] = useState(false)
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

  const [seansArr, setSeansArr] = useState([])

  useEffect(() => {
    if (places?.length > 0) {
      setSeansArr(JSON.parse(places[0]))
    }
  }, [places])


  const [data, setData] = useState('')


  const getPrice = (y, i, x) => {

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
    // data[i].active = !data[i].active
    let data1 = [...tickets]
    if (data1.findIndex((elm) => elm.seatId == i) < 0) {
      data[i].active = true
    }
    else {
      data[i].active = false
    }
    let item = {}
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

  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/hamalir7000.png'; // Path to the image in the public directory
    img.onload = () => setImageSrc(img.src);
  }, []);


  useEffect(() => {
    const image = new Image();
    image.src = '/assets/hamalir7000.png';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height);

      const imageData = ctx.getImageData(0, 0, image.width, image.height);
      const pixelData = imageData.data;
      const coordinatesArray = [];

      for (let y = 0; y < image.height; y++) {
        for (let x = 0; x < image.width; x++) {
          const offset = (y * image.width + x) * 4;
          const r = pixelData[offset];
          const g = pixelData[offset + 1];
          const b = pixelData[offset + 2];

          if (r >= 100 && g <= 35 && b <= 35) {
            coordinatesArray.push({ x, y, active: false, id: coordinatesArray.length });
          }
        }
      }

      setCoordinatesState(coordinatesArray);
    };
  }, []);



  return (
    <div >
      <img
        style={{ paddingTop: pading, paddingLeft: pading }}
        className="zoomable-image"
        alt='' src={imageSrc} />
      {coordinatesState.map((e, i) => {
        let top = 0
        let left = -5
        let roted = 0
        if (e.x >= 386 && e.x <= 597 && e.y >= 2233 && e.y <= 2549) {
          top = -15
          left = 0
          roted = -90
        }
        else if (e.x >= 951 && e.x <= 952 && e.y >= 2117 && e.y <= 2377) {
          top = -15
          left = 0
          roted = -90
        }
        else if (e.x >= 881 && e.x <= 975 && e.y >= 1802 && e.y <= 2063) {
          top = -15
          left = -0
          roted = -90
        }
        else if (e.x >= 316 && e.x <= 975 && e.y >= 1855 && e.y <= 2170) {
          top = -15
          left = -0
          roted = -90
        }
        else if (e.x >= 905 && e.x <= 975 && e.y >= 1172 && e.y <= 1433) {
          top = -15
          left = -0
          roted = -90
        }
        else if (e.x >= 738 && e.y >= 1091 && e.y <= 1387) {
          top = -15
          left = -0
          roted = -90
        }
        if (seansArr.find((e) => e.id == i)?.price && seansArr.find((e) => e.id == i)?.price > 0) {
          if (soldTickets.findIndex((elm) => elm.id == e.id) < 0) {
            return <button
              key={i}
              onMouseOver={() => {
                getPrice(e.y, i, e.x, e.parterre, e.amphitheater, e.lodge)
              }}
              style={
                {
                  top: e?.y + top, left: e?.x + left,
                  backgroundColor: tickets.find((elm) => elm.seatId == e.id) && '#24005C',
                  transform: ` rotate(${roted}deg)`,
                }
              }
              id='seatStyle2'
              onMouseLeave={() => {
                setShowModal(false)
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
                }
              }}
              onTouchEnd={() => {
                if (!click) {
                  addTicket(i, e.price, e.id, e.parterre, e.amphitheater, e.lodge)
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
      })
      }

      {showModal &&
        <div
          onMouseEnter={() => {
            setShowModal(true)
          }}
          onMouseLeave={() => {
            setShowModal(false)
          }}
          style={{
            top: position.y - 135 - (
              (value.scale < 0.69) && 20 / value.scale), left: position.x - 50, position: 'absolute', transform: `scale(${1 / (value.scale + 0.3)})`
          }} className='parter'>
          <p className='Teatertext'>շարք {activeTicket.row}</p>
          <p className='Teatertext'>տեղ {activeTicket.seat}</p>
          <p className='Teatertext'>{activeTicket.price} դրամ</p>
        </div>
      }
    </div>
  )
}
export default Karendemrjyanmec
