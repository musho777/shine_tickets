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
  const Event_reducer = useSelector((st) => st.Event_reducer)
  const { language } = useSelector((st) => st.StaticReducer)

  const disable = useDispatch()

  useEffect(() => {
    let item = localStorage.getItem('lang')
    if (item) {
      disable(ChangeLanguageAction(item))
    }
    else {
      disable(ChangeLanguageAction('am'))
    }
  }, [language])

  return <>
    <div className="HeaderDiv">
      <Header />
    </div>
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
}

export default appWithTranslation(MyApp)


