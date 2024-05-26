import { ActiveArrowSvg, ArrowSvg, WorldSvg } from "@/src/components/svg"
import { ChangeLanguageAction } from "@/src/services/action/action";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux"

export const Language = () => {
  const [openLanguage, setOpenLanguage] = useState(false)

  const { i18n } = useTranslation()
  const [lang, setLang] = useState()
  const dispatch = useDispatch()
  const menuRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenLanguage(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);


  const changeLanguage = (lng) => {
    dispatch(ChangeLanguageAction(lng))
    i18n.changeLanguage(lng);
    if (lng == 'ru') {
      setLang("РУС")
    }
    else if (lng == 'en') {
      setLang("Eng")
    }
    else {
      setLang("ՀԱՅ")
    }
  };


  useEffect(() => {
    if (localStorage.getItem('lang') == 'ru') {
      setLang("РУС")
    }
    else if (localStorage.getItem('lang') === 'en') {
      setLang("Eng")
    }
    else {
      setLang("ՀԱՅ")
    }
  }, [])

  return <div
    id={openLanguage ? 'openLanguage' : ''}
    onClick={(e) => { setOpenLanguage(true) }
    } className='LanguageDiv'>
    <WorldSvg />
    <p>{lang}</p>
    {openLanguage ? <ActiveArrowSvg /> : <ArrowSvg />}
    {openLanguage &&
      <div ref={menuRef} className='SelectLanguage'>
        <p onClick={() => changeLanguage('am')}>Հայերեն</p>
        <p onClick={(e) => changeLanguage('ru')}>Русский</p>
        <p onClick={() => { changeLanguage('en') }} >English</p>
      </div>}
  </div>
}