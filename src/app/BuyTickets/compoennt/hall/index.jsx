import { Restart } from "@/src/components/svg";
import { ZoomMap } from "@/src/components/ZoomMap/ZoomMap";
import { SetTicketsAction } from "@/src/services/action/action";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

export const Hall = ({ color, setShowTickets }) => {
  const getSinglPage = useSelector((st) => st.getSinglPage)
  const tickets = useSelector((st) => st.tiketsForBuy)

  const { event } = getSinglPage?.events
  const [show, setShow] = useState(false)
  const [showSeatMap, setShowSetMap] = useState(false)
  const getHall = useSelector((st) => st.getHall)
  const [showEnteryType, setShowEnteryType] = useState(false)
  const dispatch = useDispatch()
  const { t } = useTranslation();


  const handleZoomOut = () => {
    if (value.scale - 0.1 > 0.1)
      setValue({
        scale: value.scale - 0.1,
        translation: value.translation
      })
  };

  const handleZoomIn = () => {
    setValue({
      scale: value.scale + 0.1,
      translation: value.translation

    })
  };
  const [value, setValue] = useState({
    scale: 0.206,
    translation: { x: 0, y: 0 }
  });

  const addTicket = (item) => {
    let count = 0
    tickets.tickets.map((elm, i) => {
      if (elm.name == item.name) {
        count = count + 1
      }
    })

    let data = {
      name: item.name,
      id: item.id,
      price: item.mutqi_gumar
    }
    console.log(data, 'data')
    if (count <= item.sahmanachap) {
      dispatch(SetTicketsAction(data))
    }
    else {
      Swal.fire(t("Youhavereached"));
    }
  }

  useEffect(() => {
    if (getSinglPage.events.mutqavchar_type == 'mix' || getSinglPage.events.mutqavchar_type == "entrance") {
      setShow(true)
    }
    else {
      setShow(false)
      setShowSetMap(true)
    }
  }, [getSinglPage.event])


  return <div className='HallWrapper'>

    <div className="zoom-controls">
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>
      <button aria-label="Restart" onClick={() => setValue({ scale: 0.13, translation: { x: 70, y: 25 } })}>
        <Restart />
      </button>
    </div>
    {(show && !showSeatMap) &&
      <div style={{
        backgroundImage: `url(https://dev2.shinetickets.com/${getHall.events?.map?.background})`,
      }} className='Hall seatType'>
        <div className="seatTypeButton"
          onClick={() => {
            setShow(false)
            setShowEnteryType(true)
          }}
        >մուտքավճար</div>
        {getSinglPage.events.mutqavchar_type == 'mix' && <div className="seatTypeButton" onClick={() => {
          setShow(false)
          setShowSetMap(true)
        }}>նստատեղ
        </div>}
      </div>}
    {(!show && showSeatMap) &&
      <div className='Hall'>
        <ZoomMap
          event={event}
          value={value}
          setValue={(e) => setValue(e)}
          getSinglPage={getSinglPage}
          color={color}
        />
      </div>
    }
    {(!show && showEnteryType) &&
      <div style={{ backgroundImage: `url(https://dev2.shinetickets.com/${getHall.events?.map?.background})`, }} className='Hall seatType'>
        <div className="EnteryTypeWrapper">
          {getHall.events.entrances.map((elm, i) => {
            console.log(elm)
            return <div key={i} className="EnteryTypeNumber">
              <div style={{ display: 'flex', gap: 10, }}>
                <div>{elm.name}</div>
                <div>{elm.mutqi_gumar}</div>
              </div>
              <div className="EnteryTypeNumberPlaseMinus">

                <div onClick={() => addTicket(elm)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                    <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z" />
                  </svg>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
    }

    {tickets.tickets.length > 0 && <div onClick={() => setShowTickets(true)} className='Ticketdivs'>
      <div>
        <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5288 0.497641L10.8945 3.01487C10.6047 3.21857 10.4016 3.52348 10.3255 3.86948C10.2493 4.21548 10.3056 4.57745 10.4831 4.88402C10.7577 5.35741 10.8444 5.91666 10.7261 6.45095C10.6077 6.98523 10.293 7.45557 9.84418 7.76873C9.39329 8.07857 8.84247 8.20778 8.30082 8.13076C7.75917 8.05375 7.26619 7.77613 6.91953 7.3529C6.69493 7.07889 6.37582 6.89898 6.02511 6.84863C5.67441 6.79828 5.31758 6.88115 5.02496 7.0809L1.38665 9.60028C1.07974 9.81329 0.869885 10.1394 0.803146 10.5069C0.736408 10.8745 0.818237 11.2535 1.03068 11.5608L5.04313 17.3542C5.29199 17.7121 5.62031 18.0075 6.00238 18.2173C6.07578 18.258 6.13882 18.3151 6.1866 18.384C6.23439 18.453 6.26563 18.5321 6.27791 18.6151C6.34002 19.0467 6.50145 19.458 6.74949 19.8166L17.0405 34.6729C17.2535 34.9798 17.5796 35.1897 17.9472 35.2564C18.3148 35.3232 18.6939 35.2413 19.0012 35.0289L22.6361 32.5082C22.926 32.3045 23.129 31.9996 23.2052 31.6536C23.2813 31.3076 23.2251 30.9456 23.0475 30.639C22.7699 30.1661 22.6813 29.6058 22.7995 29.0703C22.9176 28.5348 23.2338 28.0638 23.6846 27.7516C24.1353 27.4393 24.6875 27.309 25.2303 27.3866C25.7732 27.4643 26.2667 27.7442 26.6118 28.1703C26.8364 28.4443 27.1555 28.6242 27.5062 28.6746C27.8569 28.7249 28.2138 28.642 28.5064 28.4423L32.1407 25.9251C32.4476 25.7121 32.6575 25.386 32.7242 25.0184C32.791 24.6508 32.7091 24.2718 32.4967 23.9645L22.2057 9.10821C21.9572 8.75013 21.6292 8.45449 21.2472 8.24449C21.1736 8.20388 21.1103 8.14676 21.0624 8.07761C21.0145 8.00845 20.9833 7.92915 20.9711 7.8459C20.9089 7.41468 20.7477 7.00371 20.5001 6.64519L16.4869 0.852432C16.2737 0.546476 15.948 0.337388 15.5811 0.270901C15.2141 0.204413 14.8358 0.285938 14.5288 0.497641ZM9.57229 16.039C9.65707 16.1614 9.71691 16.2992 9.74841 16.4447C9.7799 16.5902 9.78242 16.7405 9.75583 16.887C9.72923 17.0334 9.67405 17.1732 9.59342 17.2983C9.51279 17.4235 9.4083 17.5315 9.28591 17.6163L8.33801 18.2728C8.09077 18.4387 7.78818 18.5006 7.49564 18.4452C7.2031 18.3898 6.94411 18.2215 6.77462 17.9768C6.60514 17.732 6.53878 17.4303 6.58989 17.137C6.641 16.8437 6.80548 16.5823 7.04776 16.4093L7.99497 15.7526C8.11734 15.6679 8.25521 15.608 8.4007 15.5765C8.5462 15.545 8.69648 15.5425 8.84295 15.5691C8.98942 15.5957 9.12922 15.6509 9.25436 15.7315C9.3795 15.8122 9.48753 15.9166 9.57229 16.039ZM13.1959 13.5292C13.3669 13.7763 13.4328 14.0811 13.3792 14.3767C13.3255 14.6724 13.1566 14.9346 12.9097 15.1057L12.0038 15.7332C11.7566 15.9044 11.4516 15.9704 11.1558 15.9167C10.86 15.8629 10.5976 15.6939 10.4264 15.4468C10.2552 15.1997 10.1892 14.8947 10.2429 14.5989C10.2967 14.3031 10.4657 14.0407 10.7128 13.8696L11.6187 13.2421C11.7411 13.157 11.8792 13.0968 12.0249 13.0651C12.1706 13.0334 12.3211 13.0308 12.4678 13.0574C12.6146 13.0839 12.7546 13.1392 12.88 13.22C13.0053 13.3008 13.1135 13.4055 13.1982 13.5282L13.1959 13.5292ZM16.8195 11.0194C16.9043 11.1418 16.9641 11.2796 16.9956 11.4251C17.0271 11.5706 17.0297 11.7209 17.0031 11.8673C16.9765 12.0138 16.9213 12.1536 16.8406 12.2787C16.76 12.4039 16.6555 12.5119 16.5331 12.5966L15.6272 13.2241C15.38 13.39 15.0774 13.4519 14.7849 13.3965C14.4923 13.3411 14.2333 13.1728 14.0639 12.928C13.8944 12.6833 13.828 12.3816 13.8791 12.0883C13.9302 11.795 14.0947 11.5336 14.337 11.3606L15.2429 10.7331C15.3652 10.6477 15.5032 10.5872 15.6489 10.5552C15.7946 10.5232 15.9453 10.5203 16.0921 10.5466C16.239 10.5729 16.3792 10.628 16.5047 10.7086C16.6303 10.7893 16.7386 10.8939 16.8236 11.0165L16.8195 11.0194ZM20.4862 8.48644C20.571 8.6088 20.6308 8.74666 20.6623 8.89215C20.6938 9.03764 20.6963 9.18791 20.6698 9.33438C20.6432 9.48084 20.588 9.62063 20.5073 9.74577C20.4267 9.8709 20.3222 9.97893 20.1998 10.0637L19.2535 10.7155C19.1311 10.8025 18.9925 10.8643 18.846 10.8973C18.6994 10.9303 18.5478 10.9338 18.3999 10.9077C18.2519 10.8815 18.1107 10.8263 17.9843 10.745C17.8579 10.6638 17.7489 10.5583 17.6637 10.4346C17.5785 10.3109 17.5187 10.1715 17.4878 10.0245C17.4569 9.87754 17.4555 9.72586 17.4838 9.57834C17.5121 9.43081 17.5694 9.29036 17.6524 9.16518C17.7354 9.03999 17.8425 8.93255 17.9674 8.84911L18.9131 8.1965C19.0355 8.11178 19.1734 8.052 19.319 8.02058C19.4645 7.98915 19.6147 7.9867 19.7612 8.01336C19.9077 8.04002 20.0474 8.09527 20.1725 8.17595C20.2976 8.25663 20.4056 8.36117 20.4903 8.48359L20.4862 8.48644Z" fill="white" />
        </svg>
        <div className='TicketCount'>
          {tickets.tickets.length}
        </div>
      </div>
    </div>}

  </div>
}