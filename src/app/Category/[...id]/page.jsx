"use client"
import '../style.css'
import '../../allEvents/style.css'
import 'react-date-range/dist/styles.css'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEvents2, GetHall, SubCategory } from '../../../services/action/action'
import { CategoryCardWrapper } from '../CategoryCardWrapper'
import { ClearFiltr, Emoji, EmojiM } from '../../../components/svg'
import { ExpectedEvents } from '../../../components/ExpectedEvents'
import { PuffLoader } from 'react-spinners'
import DynamicMeta from '@/src/components/DinamicMetaData'
import operaImage from '../../../assets/Opera.webp'
import concertImage from '../../../assets/Concert.webp'
import teaterImage from '../../../assets/Teater.webp'
import CinemaImage from '../../../assets/Cinema.webp'
import sportImage from '../../../assets/Oter.webp'



const Category = ({ params }) => {
  const dispatch = useDispatch()
  const id = params.id[1]
  const { t } = useTranslation()
  const events = useSelector((st) => st.getAllEventes)
  const { language } = useSelector((st) => st.StaticReducer)
  const [page, setPage] = useState(1)
  const [hallId, setHallId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [selectedDate, setSelectedDate] = useState([{ startDate: '', endDate: '', key: 'selection', },])
  const [baner, setBaner] = useState(<div></div>)
  const [data, setData] = useState([])
  const [name, setName] = useState("")

  useEffect(() => {
    setData([])
    setPage(1)
  }, [])

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
    if (language) {
      dispatch(GetAllEvents2(page, language, id))
    }
  }, [selectedDate, id, subcategoryId, page, hallId, language])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(SubCategory({ id: id }))
    setSubcategoryId('')
    setHallId('')
    setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
    if (id == '1') {
      setName('CONCERT')
      setBaner(
        <div className='CategoryBaner'>
          <div id='C' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('CONCERT')}</p>
            </div>
          </div>
          <img src={concertImage.src} />
        </div>
      )
    }
    else if (id == '4') {
      setName('OPERA')
      setBaner(
        <div className='CategoryBaner'>
          <div id='O' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('OPERA')}</p>
            </div>
          </div>
          <img src={operaImage.src} />
        </div>
      )
    }
    else if (id == '3') {
      setName('CINEMA')
      setBaner(
        <div className='CategoryBaner'>
          <div id='K' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('CINEMA')}</p>
            </div>
          </div>
          <img src={CinemaImage.src} />
        </div>
      )
    }
    else if (id == '2') {
      setName('THEATRE')
      setBaner(
        <div className='CategoryBaner'>
          <div id='T' className='CategoryBanerFon' >
            <div className='container'>
              <p>{t('THEATRE')}</p>
            </div>
          </div>
          <img src={teaterImage.src} />
        </div>
      )
    }
    else if (id == '5') {
      setName('Sport')
      setBaner(
        <div className='CategoryBaner'>
          <div id='A' className='CategoryBanerFon' >
            <div className='container'>
              <p>ՍՊՈՐՏ</p>
            </div>
          </div>
          <img src={sportImage.src} />
        </div>
      )
    }
    else {
      setBaner(
        <div className='CategoryBaner'>

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
    if (events.events?.length > 0) {
      combinedArray = item.concat(events.events);
    }
    setData(combinedArray)
  }, [events.events])


  const ClearFunction = () => {
    setSubcategoryId('')
    setHallId('')
    setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
  }
  return (
    <>
      <DynamicMeta
        title={name}
        description={event?.description}
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
            <div className='CategoryScreenBaner2'>
              {baner}
            </div>
            {events?.loading && page == 1 ?
              <div className='loading'>
                <PuffLoader color="#FEE827" />
              </div> :
              <div className='CategoryScreen1Div'>
                <CategoryCardWrapper loading={events.loading} showButton={page < events.events.totalPages} setPage={(e) => setPage(e)} page={page} data={data} />
                {!events.events?.length > 0 && !events?.loading &&
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