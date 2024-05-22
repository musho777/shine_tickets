import 'react-date-range/dist/styles.css'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-date-range/dist/theme/default.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEvents, GetHall, SubCategory } from '../../services/action/action'
import { useParams } from 'react-router-dom'
import { CategoryMenu } from '../../components/CategoryMenu'
import { Calendar } from '../../components/Calendar'
import { ClearFiltr, Emoji, EmojiM } from '../../components/svg'
import { AllEventsWrapper } from '../../pages/AllEvents/AllEventsWrapper'

export const AllWeekEvents = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { t } = useTranslation()
    const events = useSelector((st) => st.getAllEventes)
    const openMenu = useSelector((st) => st.StaticReducer)
    const { language } = useSelector((st) => st.StaticReducer)
    const [getSubCategory, setGetSubCategory] = useState([])
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
    const { paronyanEvents } = useSelector((st) => st)
    const { getWeekEvent } = useSelector((st) => st)

    useEffect(() => {
        HallName()
    }, [language])

    useEffect(() => {
        if (getCategory?.category?.length) {
            setGetSubCategory(getCategory?.category)
        }
    }, [getCategory])

    useEffect(() => {
        dispatch(GetHall())
        let date = new Date(selectedDate[0].endDate)
        let startDate = new Date(selectedDate[0].startDate)
        let statDate = ''
        let endDate = ''
        if (selectedDate[0].endDate) {
            endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        if (selectedDate[0].startDate) {
            statDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
        }
        dispatch(GetAllEvents(page, {
            subcategory: subcategoryId, date: {
                startDate: statDate,
                endDate
            }, hall: hallId
        }))

    }, [selectedDate, subcategoryId, page, hallId])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        dispatch(SubCategory())
        setActiveButton('Բոլորը')
        setSubcategoryId('')
        setHallId('')
        setSelectedDate([{ startDate: '', endDate: '', key: 'selection' }])
    }, [])


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
        <div className='CategoryScreen'>
            <div id='CategoryScreen1' className='container'>
                <div onClick={() => ClearFunction()} className='ClearFilterDiv'>
                    {(hallId || selectedDate[0].startDate) && <div className='ClearFilter'>
                        <p>{t('Cancel')}</p>
                        <ClearFiltr />
                    </div>}
                </div>
                <div className='CategoryScreen1Div'>
                    <AllEventsWrapper paronyan={id == '657b00c67a91070546630967' ? paronyanEvents.events?.result : []} data={getWeekEvent} />
                    {!paronyanEvents?.events?.length > 0 && !events.events?.sessions?.length > 0 &&
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
            </div>
            {/* <div className='container'>
                <ExpectedEvents />
            </div> */}
        </div>
    )
}