import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Calendar } from '../../../components/Calendar'
import { CategoryMenu } from "@/src/components/CategoryMenu"


export const FiltrDiv = ({ selectedDate, setSelectedDate, date }) => {
  const [height, setHeight] = useState(false)
  const [hallName, setHallName] = useState()
  const [hallDefaultName, setHallDefaultName] = useState('')
  const getSubCategory = useSelector((st) => st.getSubCAtegory)
  const [openCalendar, setOpenCalendar] = useState(false)
  const getCategory = useSelector((st) => st.getCategory)
  const { language } = useSelector((st) => st.StaticReducer)
  const [hallId, setHallId] = useState('')
  const openMenu = useSelector((st) => st.StaticReducer)
  const { t } = useTranslation()



  document.body.addEventListener('click', function () {
    setOpenCalendar(false)
    setHeight(false)
  });

  if (openMenu?.openCalendar) {
    return <Calendar
      selectedDate={selectedDate}
      setSelectedDate={(e) => setSelectedDate(e)}
      close={() => dispatch(openCalendar(false))}
    />
  }
  if (openMenu?.categoryMenu) {
    return <CategoryMenu onClick={(e) => {
      setHallId(e?._id)
    }} item={events.hall} close={() => setOpen(!open)} />
  }

  return <div className='FilterDiv'>
    <div className='CalendarDiv'>
      <div >
        <p className='FilterDivTitle'>{t('Date')}</p>
        <div className='CalendarWrapper'>
          <div onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpenCalendar(true)
          }}
            className='CalendarDivCalendar'>
            <p>{date}</p>
          </div>
          <div className='CalendarDiV'>
            {openCalendar && <Calendar
              selectedDate={selectedDate}
              setSelectedDate={(e) => setSelectedDate(e)}
              close={() => dispatch(openCalendar(false))}
            />}
          </div>
        </div>
      </div>
      <div>
        <p className='FilterDivTitle'>{t('Place1')}</p>
        <div style={{ borderBottomLeftRadius: height && 0, borderBottomRightRadius: height && 0 }} onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setHeight(!height)
          setOpenCalendar(false)
        }} className='CalendarDivCalendar'>
          <p>{hallName ? (hallName) : (hallDefaultName)}</p>
          <div style={{ height: height ? 200 : 0 }} className='CalendarDivCalendaR'>
            <div
              onClick={() => {
                setHallId('')
                setHallName(hallDefaultName)
              }}
              className='getCategoryDiv'>{(hallDefaultName)}</div>
            {height && getCategory.hall.map((elm, i) => {
              if (language == 'en') {
                return <div key={i} onClick={() => {
                  setHallId(elm._id)
                  setHallName(`${elm.place_en} ${elm?.hall_en}`)
                }} className='getCategoryDiv'>{`${elm.place_en} ${elm?.hall_en}`}</div>
              }
              else if (language == 'am') {
                return <div
                  key={i}
                  onClick={() => {
                    setHallId(elm._id)
                    setHallName(`${elm.place} ${elm?.hall}`)
                  }}
                  className='getCategoryDiv'>{(`${elm.place} ${elm?.hall}`)}</div>
              }
              else if (language == 'ru') {
                return <div
                  key={i}
                  onClick={() => {
                    setHallId(elm._id)
                    setHallName(`${elm.place_ru} ${elm?.hall_ru}`)
                  }}
                  className='getCategoryDiv'>{`${elm.place_ru} ${elm?.hall_ru}`}</div>
              }
            })}
          </div>
        </div>
      </div>
    </div>
    <div className='FilterDivButton'>
      {getSubCategory?.data?.subcategories?.length > 0 && <p className='FilterDivTitle'>{t('Genre')}</p>}
      <div>
        {getSubCategory?.data?.subcategories?.length > 0 &&
          <button
            onClick={() => {
              setActiveButton('Բոլորը')
              setSubcategoryId('')
            }} id={activeButton == 'Բոլորը' && 'active'} className='SubCategoryButton'
          >
            {t('All')}
          </button>}
        {getSubCategory?.data?.subcategories?.map((elm, i) => {
          let name = ''
          if (language === 'am') {
            name = elm?.name
          }
          else if (language === 'en') {
            name = elm?.name_en
          }
          else if (language === 'ru') {
            name = elm?.name_ru
          }
          return <button key={i} onClick={() => {
            setActiveButton(elm?.name)
            setSubcategoryId(elm?._id)
          }} id={activeButton == elm?.name && 'active'} className='SubCategoryButton'>{name}</button>
        })}
      </div>
    </div>
  </div>
}