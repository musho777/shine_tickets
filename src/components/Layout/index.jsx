import './style.css'
import { Header } from '../Header/index.jsx'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Footer } from '../Footer/index.jsx'
import { useTranslation } from 'react-i18next'

export const Layout = () => {
    const { t } = useTranslation()
    const { Event_reducer } = useSelector((st) => st)
    return (<>
        <div className='HeaderDiv'>
            <Header />
        </div>
        <div className='container'>
            <div className='wrapper'>
                <p className='mainPageText'>{t('forDelivery')} <span>{Event_reducer?.feedback?.phone}</span></p>
            </div>
        </div>
        <div className='outlet'>
            <Outlet />
        </div>
        <Footer />
    </>
    )
}