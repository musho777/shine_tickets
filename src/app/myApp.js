"use client"
import './page.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeLanguageAction } from "../services/action/action"
import { Header } from "../components/Header"
import { Footer } from '../components/Footer'

const MyApp = ({ children }) => {
  const [lang, setLang] = useState('')
  const { language } = useSelector((st) => st.StaticReducer)
  const disable = useDispatch()
  useEffect(() => {
    let item = localStorage.getItem('lang')
    if (language) {
      setLang(language)
    }
    else if (item) {
      setLang(item)
      disable(ChangeLanguageAction(item))
    }
    else {
      setLang('am')
      disable(ChangeLanguageAction('am'))
    }

  }, [language])
  return <div>
    <div className="HeaderDiv">
      <Header />
    </div>
    <div className='container'>
      <div className='wrapper'>
        <p className='mainPageText'>{('forDelivery')} <span>+ddfdfdf</span></p>
      </div>
    </div>
    <div className="outlet">
      {children}
    </div>
    <Footer />
  </div>
}

export default MyApp