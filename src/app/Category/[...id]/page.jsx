"use client"
import '../style.css'
import '../../allEvents/style.css'
import 'react-date-range/dist/styles.css'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CategoryMenu } from '../../../components/CategoryMenu'
import { GetAllEvents, GetHall, SubCategory } from '../../../services/action/action'
import { Calendar } from '../../../components/Calendar'
import { CategoryCardWrapper } from '../CategoryCardWrapper'
import { ClearFiltr, Emoji, EmojiM } from '../../../components/svg'
import { ExpectedEvents } from '../../../components/ExpectedEvents'
import { PuffLoader } from 'react-spinners'
import DynamicMeta from '@/src/components/DinamicMetaData'

const Category = ({ params }) => {
  const dispatch = useDispatch()
  const id = params.id[1]
  const { t } = useTranslation()
  const events = useSelector((st) => st.getAllEventes)
  const openMenu = useSelector((st) => st.StaticReducer)
  const { language } = useSelector((st) => st.StaticReducer)
  const getSubCategory = useSelector((st) => st.getSubCAtegory)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [hallId, setHallId] = useState('')
  const [hallName, setHallName] = useState()
  const [hallDefaultName, setHallDefaultName] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [activeButton, setActiveButton] = useState('Բոլորը')
  const [selectedDate, setSelectedDate] = useState([{ startDate: '', endDate: '', key: 'selection', },])
  const getCategory = useSelector((st) => st.getCategory)
  const [date, setDate] = useState('')
  const [height, setHeight] = useState(false)
  const [baner, setBaner] = useState(<div></div>)
  const [data, setData] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    setData([])
    setPage(1)
  }, [])

  useEffect(() => {
    HallName()
  }, [language])

  useEffect(() => {
    dispatch(GetHall())
    let date = new Date(selectedDate[0]?.endDate)
    let startDate = new Date(selectedDate[0]?.startDate)
    let statDate = ''
    let endDate = ''
    if (selectedDate[0].endDate) {
      endDate = `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`
    }
    if (selectedDate[0].startDate) {
      statDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
    }
    dispatch(GetAllEvents(page, {
      category: id, subcategory: subcategoryId, date: {
        startDate: statDate,
        endDate
      }, hall: hallId
    }))
  }, [selectedDate, id, subcategoryId, page, hallId])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(SubCategory({ id: id }))
    setActiveButton('Բոլորը')
    setSubcategoryId('')
    setHallId('')
    setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
    if (id == '65ce7bcc25c566d4e297d2ec') {
      setName('CONCERT')
      setBaner(
        <div className='CategoryBaner'>
          <div id='C' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('CONCERT')}</p>
            </div>
          </div>
          <img src={require('../../../assets/Concert.webp')} />
        </div>
      )
    }
    else if (id == '65ce7dbd25c566d4e297d437') {
      setName('OPERA')
      setBaner(
        <div className='CategoryBaner'>
          <div id='O' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('OPERA')}</p>
            </div>
          </div>
          <img src={require('../../../assets/Opera.webp')} />
        </div>
      )
    }
    else if (id == '65ce7d9d25c566d4e297d3f3') {
      setName('CINEMA')
      setBaner(
        <div className='CategoryBaner'>
          <div id='K' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('CINEMA')}</p>
            </div>
          </div>
          <img src={require('../../../assets/Cinema.webp')} />
        </div>
      )
    }
    else if (id == '65ce7c4a25c566d4e297d30b') {
      setName('THEATRE')
      setBaner(
        <div className='CategoryBaner'>
          <div id='T' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('THEATRE')}</p>
            </div>
          </div>
          <img src={require('../../../assets/Teater.webp')} />
        </div>
      )
    }
    else if (id == '65ce7e9f25c566d4e297d47c') {
      setName('Sport')
      setBaner(
        <div className='CategoryBaner'>
          <div id='A' className='CategoryBanerFon' >
            <div className='container'>
              <p>ՍՊՈՐՏ</p>
            </div>
          </div>
          <img src={require('../../../assets/Oter.webp')} />
        </div>
      )
    }
    else {
      setBaner(
        <div className='CategoryBaner'>
          {/* <div id='K' className='CategoryBanerFon' >
                        <div className='container'>
                            <p>ԿԻՆՈ</p>
                        </div>
                    </div>
                    <img src={require('../../assets/Cinema.png')} /> */}
        </div>
      )
    }

  }, [id])


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
    if (events.events.sessions?.length > 0) {
      combinedArray = item.concat(events.events.sessions);
    }
    setData(combinedArray)
  }, [events.events])


  if (openMenu?.categoryMenu) {
    return <CategoryMenu onClick={(e) => {
      setHallId(e?._id)
    }} item={events.hall} close={() => setOpen(!open)} />
  }
  if (openMenu?.openCalendar) {
    return <Calendar
      selectedDate={selectedDate}
      setSelectedDate={(e) => setSelectedDate(e)}
      close={() => dispatch(openCalendar(false))}
    />
  }

  document.body.addEventListener('click', function () {
    setOpenCalendar(false)
    setHeight(false)
  });

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
  return (
    <>
      <DynamicMeta
        title={name}
        description={event?.description_en}
      />
      <div className='CategoryScreen'>
        <div className='CategoryScreenBaner'>
          {baner}
        </div>

        <div>
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
                          return <div onClick={() => {
                            setHallId(elm._id)
                            setHallName(`${elm.place_en} ${elm?.hall_en}`)
                          }} className='getCategoryDiv'>{`${elm.place_en} ${elm?.hall_en}`}</div>
                        }
                        else if (language == 'am') {
                          return <div
                            onClick={() => {
                              setHallId(elm._id)
                              setHallName(`${elm.place} ${elm?.hall}`)
                            }}
                            className='getCategoryDiv'>{(`${elm.place} ${elm?.hall}`)}</div>
                        }
                        else if (language == 'ru') {
                          return <div
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
                    return <button onClick={() => {
                      setActiveButton(elm?.name)
                      setSubcategoryId(elm?._id)
                    }} id={activeButton == elm?.name && 'active'} className='SubCategoryButton'>{name}</button>
                  })}
                </div>

              </div>
            </div>
            <div className='CategoryScreenBaner2'>
              {baner}
            </div>
            {events?.loading && page == 1 ?
              <div className='loading'>
                <PuffLoader color="#FEE827" />
              </div> :
              <div className='CategoryScreen1Div'>
                <CategoryCardWrapper loading={events.loading} showButton={page < events.events.totalPages} setPage={(e) => setPage(e)} page={page} data={data} />
                {!events.events?.sessions?.length > 0 && !events?.loading &&
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

          <div className='container'>
            <ExpectedEvents />
          </div>
        </div>

      </div>
    </>
  )
}

export default Category