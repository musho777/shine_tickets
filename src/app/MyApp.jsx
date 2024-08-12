"use client"
import './page.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeLanguageAction } from "../services/action/action"
import { Header } from "../components/Header"
import { Footer } from '../components/Footer'
import { appWithTranslation, useTranslation } from 'next-i18next';
import '../lib/i18n'

const MyApp = ({ children }) => {
  const { t } = useTranslation()
  const Event_reducer = useSelector((state) => state.Event_reducer)
  const dispatch = useDispatch()

  useEffect(() => {
    const item = localStorage.getItem('lang')
    if (item) {
      dispatch(ChangeLanguageAction(item))
    } else {
      dispatch(ChangeLanguageAction('am'))
    }
  }, [dispatch])

  return (
    <>
      <Header />
      <div className='container'>
        <div className='wrapper'>
          <p className='mainPageText'>{t('forDelivery')} <span>{Event_reducer?.feedback?.phone}</span></p>
        </div>
      </div>
      <div className="outlet">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default appWithTranslation(MyApp)
