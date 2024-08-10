import { useDispatch, useSelector } from 'react-redux'
import { CategoryDiv, PhonSvg } from '../svg'
import './styles.css'
import { ChangeLanguageAction } from '../../services/action/action'
import { useTranslation } from 'react-i18next'
export const MobileMenuComponent = ({ setOpen, color }) => {
    const getCategory = useSelector((st) => st.getCategory)
    const dispatch = useDispatch()
    const feedback = useSelector(st => st.Event_reducer.feedback)
    const { t } = useTranslation()


    return <div onClick={() => setOpen(false)} className='MenuWrapper1'>
        <div onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
        }} className='Menu'>
            <p>{t('DEPARTMENTS')}</p>
            <div className='MenuWrapper'>
                <div className='MenuWrapperDiv'>
                    {getCategory.category.map((elm, i) => {
                        return <div key={i} className='MobileMenuWrapper'>
                            <CategoryDiv color={color[i]} />
                            <p onClick={() => {
                                setOpen(false)
                                window.location = `/Category/${elm?.name}/${elm?.id}`
                            }} className='MenuHeadertext'>
                                {elm.name}
                            </p>
                        </div>
                    })}
                </div>
                <div className='ButtonWrapperHeader'>
                    <button
                        onClick={() => window.location.href = `tel:${feedback?.phone}`} className='phonNumber'>
                        <PhonSvg />
                        {t('freeDelivery1')}
                    </button>
                </div>
                <div className='MobielLanguage'>
                    <p onClick={() => dispatch(ChangeLanguageAction('am'))} className={localStorage.getItem('lang') === 'am' && 'activeLanguageMobile'}>ՀԱՅ</p>
                    <p onClick={() => dispatch(ChangeLanguageAction('en'))} className={localStorage.getItem('lang') === 'en' && 'activeLanguageMobile'}>ENG</p>
                    <p onClick={() => dispatch(ChangeLanguageAction('ru'))} className={localStorage.getItem('lang') === 'ru' && 'activeLanguageMobile'}>РУС</p>
                </div>
            </div>
        </div>
    </div>

}