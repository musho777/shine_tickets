"use client"
import './style.css'
import '../../components/TopEvents/styles.css'
import '../category/style.css'
import 'react-date-range/dist/styles.css'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEvents2, GetHall, SubCategory } from '../../services/action/action'
import { CategoryMenu } from '../../components/CategoryMenu'
import { Calendar } from '../../components/Calendar'
import { ClearFiltr, Emoji, EmojiM } from '../../components/svg'
import { AllEventsWrappers } from './AllEventsWrapper'
import { PuffLoader } from 'react-spinners'

const AllEventss = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const events = useSelector((st) => st.getAllEventes)
  const openMenu = useSelector((st) => st.StaticReducer)
  const { language } = useSelector((st) => st.StaticReducer)
  const [getSubCategory, setGetSubCategory] = useState([])
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [hallId, setHallId] = useState('')
  const [data, setData] = useState([])
  const [hallName, setHallName] = useState()
  const [hallDefaultName, setHallDefaultName] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [activeButton, setActiveButton] = useState('Բոլորը')
  const [selectedDate, setSelectedDate] = useState([{ startDate: '', endDate: '', key: 'selection', },])
  const getCategory = useSelector((st) => st.getCategory)
  const [date, setDate] = useState('')
  const [height, setHeight] = useState(false)
  const menuRef = useRef(null);

  console.log(events.events, 'getCategory')

  useEffect(() => {
    HallName()
  }, [language])

  useEffect(() => {
    if (getCategory?.category?.length) {
      setGetSubCategory(getCategory?.category)
    }
  }, [getCategory])


  useEffect(() => {

    if (language) {
      dispatch(GetAllEvents2(page, language))
    }
  }, [page, language])

  useEffect(() => {
    setData([])
    setPage(1)
    dispatch(GetHall())
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(SubCategory())
    setActiveButton('Բոլորը')
    setSubcategoryId('')
    setHallId('')
    setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
  }, [])

  useEffect(() => {
    let item = [...data]
    let combinedArray = []
    if (page == 1) {
      combinedArray = []
      item = []
    }
    else {
      combinedArray = data
    }
    if (events.events?.length > 0) {
      combinedArray = item.concat(events.events);
    }
    setData(combinedArray)
  }, [events.events])

  useEffect(() => {
    let start = {}
    let end = {}
    let month = ''
    let day = ''
    let year = ''
    let month1 = ''
    let day1 = ''
    let year1 = ''

    if (selectedDate[0].startDate) {
      start = new Date(selectedDate[0].startDate)
      month = start.getMonth() + 1;
      day = start.getDate();
      year = start.getFullYear();
    }
    if (selectedDate[0].endDate) {
      end = new Date(selectedDate[0].endDate)
      month1 = end.getMonth() + 1;
      day1 = end.getDate();
      year1 = end.getFullYear();
    }
    if (month > 0 && month < 10) {
      month = `0${month}`
    }
    if (day > 0 && day < 10) {
      day = `0${day}`
    }
    if (month1 > 0 && month1 < 10) {
      month1 = `0${month1}`
    }
    if (day1 > 0 && day1 < 10) {
      day1 = `0${day1}`
    }
    setDate(`
            ${month}.${day}.${year} - ${month1}.${day1}.${year1}
        `)
  }, [selectedDate])

  if (openMenu?.categoryMenu) {
    return <CategoryMenu onClick={(e) => {
      setHallId(e?._id)
    }} item={events?.hall} close={() => setOpen(!open)} />
  }
  if (openMenu?.openCalendar) {
    return <Calendar
      selectedDate={selectedDate}
      setSelectedDate={(e) => setSelectedDate(e)}
      close={() => dispatch(openCalendar(false))}
    />
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenCalendar(false)
        setHeight(false)
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const ClearFunction = () => {
    setActiveButton('Բոլորը')
    setSubcategoryId('')
    setHallId('')
    setHallName('')
    setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
  }
  const HallName = () => {
    if (hallId == '') {
      if (language === 'ru') {
        setHallName('Все залы')
      }
      if (language === 'am') {
        setHallName('Բոլոր դահլիճները')
      } if (language === 'en') {
        setHallName('All halls')
      }
    }
    if (language === 'ru') {
      setHallDefaultName('Все залы')
    }
    if (language === 'am') {
      setHallDefaultName('Բոլոր դահլիճները')
    } if (language === 'en') {
      setHallDefaultName('All halls')
    }
  }
  function truncateText(text) {
    if (text?.length > 13 && window.innerWidth > 768) {


      return text.substring(0, 10) + '...';

    }
    else if (text?.length > 30 && window.innerWidth < 768) {
      return text.substring(0, 30) + '...';
    }
    else {
      return text;
    }
  }
  return (
    <div className='CategoryScreen'>

      <div id='CategoryScreen1' className='container'>
        <div onClick={() => ClearFunction()} className='ClearFilterDiv'>
          {(hallId || selectedDate[0].startDate) && <div className='ClearFilter'>
            <p>{t('Cancel')}</p>
            <ClearFiltr />
          </div>}
        </div>
        <div className='FilterDiv'>
          <div className='CalendarDiv'>
            <div >
              <p className='FilterDivTitle'>{t('Date')}</p>
              <div className='CalendarWrapper'>
                <div onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setOpenCalendar(true)
                }
                } className='CalendarDivCalendar'>
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
              <div ref={menuRef} style={{ borderBottomLeftRadius: height && 0, borderBottomRightRadius: height && 0 }} onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setHeight(true)
              }} className='CalendarDivCalendar'>
                <p>{truncateText(hallName ? (hallName) : (hallDefaultName))}</p>
                <div ref={menuRef} style={{ height: height ? 200 : 0 }} className='CalendarDivCalendaR'>
                  <div
                    ref={menuRef}
                    onClick={() => {
                      setHallId('')
                      setHallName(hallDefaultName)
                      setHeight(false)
                    }}
                    className='getCategoryDiv'>{(hallDefaultName)}</div>
                  <div ref={menuRef}>
                    {height && getCategory?.hall.map((elm, i) => {
                      if (language == 'en') {
                        return <div ref={menuRef} onClick={() => {
                          setHallId(elm?._id)
                          setHallName(`${elm.place_en} ${elm?.hall_en}`)
                          setHeight(false)
                        }} className='getCategoryDiv'>{(`${elm.place_en} ${elm?.hall_en} `)}</div>
                      }
                      else if (language == 'am') {
                        return <div
                          ref={menuRef}
                          onClick={() => {
                            setHallId(elm?._id)
                            setHallName(`${elm.place} ${elm?.hall}`)
                          }}
                          className='getCategoryDiv'>{`${elm.place} ${elm?.hall}`}</div>
                      }
                      else if (language == 'ru') {
                        return <div
                          ref={menuRef}
                          onClick={() => {
                            setHallId(elm?._id)
                            setHallName(`${elm.place_ru} ${elm?.hall_ru}`)
                          }}
                          className='getCategoryDiv'>{`${elm.place_ru} ${elm?.hall_ru}`}</div>
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='FilterDivButton'>
            {getSubCategory.length > 0 && <p className='FilterDivTitle'>{t('Genre')}</p>}
            <div >
              {getSubCategory.length > 0 &&
                <button
                  onClick={() => {
                    setActiveButton('Բոլորը')
                    setSubcategoryId('')
                  }} id={activeButton == 'Բոլորը' && 'active'} className='SubCategoryButton'
                >
                  {t('All')}
                </button>}
              {getSubCategory?.map((elm, i) => {
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
                return <button
                  disabled={events?.loading}
                  onClick={() => {
                    setActiveButton(elm?.name)
                    setSubcategoryId(elm?._id)
                  }} id={activeButton == elm?.name && 'active'} className='SubCategoryButton'>{name}</button>
              })}
            </div>

          </div>
        </div>
        {events?.loading && page == 1 ?
          <div className='loading'>
            <PuffLoader color="#FEE827" />
          </div> :
          <div className='CategoryScreen1Div'>
            <AllEventsWrappers loading={events.loading} showButton={page < events.events.totalPages} setPage={(e) => setPage(e)} page={page} data={data} />
            {!events.events?.length > 0 && !events.loading &&
              <div className='NotFoundDiv'>
                <div className='Emoji'>
                  <Emoji />
                </div>
                <div className='EmojiM'>
                  <EmojiM />
                </div>
                <p className='NotFound'>{t('Sorry_no')}</p>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default AllEventss