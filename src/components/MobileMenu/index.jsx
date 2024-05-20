import { useDispatch, useSelector } from 'react-redux'
import { BlueSvg, OrangeSvg, PhonSvg, RedSvg, SportSvg, TetreSvg } from '../svg'
import './styles.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ChangeLanguageAction } from '../../services/action/action'
import { useTranslation } from 'react-i18next'
export const MobileMenuComponent = ({ setOpen }) => {
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const feedback = useSelector(st => st.Event_reducer.feedback)
    const { t } = useTranslation()


    return <div
        onClick={() => {
            setOpen(false)
        }}
        className='MenuWrapper1'>

        <div
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}
            className='Menu'>
            <p>{t('DEPARTMENTS')}</p>
            <div className='MenuWrapper'>
                <div className='MenuWrapperDiv'>
                    {getCategory.category.map(elm => {
                        let div = ''
                        let bg = ''
                        if (elm._id === "65ce7bcc25c566d4e297d2ec") {
                            div = <RedSvg key={i} />
                        }
                        else if (elm._id === "65ce7c4a25c566d4e297d30b") {
                            bg = '#D943FF'
                            div = <TetreSvg key={i} />

                        }
                        else if (elm._id === "6581e2425bf51638abd3f9ee") {
                            bg = '#11AEF4'
                            div = <BlueSvg key={i} />

                        }
                        else if (elm._id === "65ce7dbd25c566d4e297d437") {
                            bg = '#FFCE00'
                            div = <OrangeSvg key={i} />

                        }
                        else if (elm._id === "6581e28f5bf51638abd3fa02") {
                            bg = '#4DCF5F'
                            div = <SportSvg key={i} />

                        }

                        else {
                            bg = '#11AEF4'
                            div = <SportSvg key={i} />
                        }
                        let title = ''
                        if (language === 'am') {
                            title = elm.name
                        } else if (language === 'en') {
                            title = elm.name_en
                        } else if (language === 'ru') {
                            title = elm.name_ru
                        }
                        return <div key={i} className='MobileMenuWrapper'>
                            {div}
                            <p onClick={() => {
                                setOpen(false)
                                navigation(`/Category/${elm.name}/${elm?._id}`)
                            }}
                                className='MenuHeadertext'>{title}</p>
                        </div>
                    })}
                </div>
                <div className='ButtonWrapperHeader'>
                    <button
                        onClick={() => {
                            window.location.href = `tel:${feedback?.phone}`
                        }}
                        className='phonNumber'>
                        <PhonSvg />
                        {t('freeDelivery1')}
                    </button>
                </div>
                <div className='LineMobileMenu' />
                <div className='MobielLanguage'>
                    <p onClick={() => dispatch(ChangeLanguageAction('am'))} className={localStorage.getItem('lang') === 'am' && 'activeLanguageMobile'}>ՀԱՅ</p>
                    <p onClick={() => dispatch(ChangeLanguageAction('en'))} className={localStorage.getItem('lang') === 'en' && 'activeLanguageMobile'}>ENG</p>
                    <p onClick={() => dispatch(ChangeLanguageAction('ru'))} className={localStorage.getItem('lang') === 'ru' && 'activeLanguageMobile'}>РУС</p>
                </div>
            </div>
        </div >
    </div>

}