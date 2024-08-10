"use client"
import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PhonSvg, } from '../svg'
import { GetCategory, GetFeedback, SearchAction } from '../../services/action/action'
import { MobileMenuComponent } from '../MobileMenu'
import logo from '../../assets/logo.webp'
import Image from 'next/image'
import { useTranslation } from 'react-i18next';
import { Language } from './components/language'
import { Category } from './components/category'
import { Search } from './components/search'
import MobileSearchs from './components/mobileSearch'

export const Header = () => {
    const dispatch = useDispatch()

    const { language } = useSelector((st) => st.StaticReducer)
    const [value, setValue] = useState('')
    const [openMenuMobile, setOpenMenuMobile] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchResultData, setSearchResultDAta] = useState(false)
    const { t } = useTranslation()
    const searchRef = useRef()
    const color = ['#FF6969', '#D943FF', '#FFCE00', '#4DCF5F', '#11AEF4']


    const feedback = useSelector(st => st.Event_reducer.feedback)
    const [openMobilsSearch, setOpenMobileSearch] = useState(false)

    useEffect(() => {
        searchRef?.current?.focus()
        if (!openMobilsSearch) {
            setValue('')
        }
    }, [openMobilsSearch])

    useEffect(() => {
        if (value) {
            dispatch(SearchAction(value))
        }
    }, [value, dispatch])

    useEffect(() => {
        if (language) {
            dispatch(GetCategory(language))
        }
        dispatch(GetFeedback())
    }, [language])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchResult) {
                setSearchResultDAta(true)
            }
        }, 300);


        if (!searchResult) {
            setSearchResultDAta(false)
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchResult]);

    return (
        <div className="HeaderDiv">
            <div className='header'>
                <div className='MainHeaderDiv'>
                    <div className='MainHeader'>
                        {!openMobilsSearch && <div onClick={() => window.location = '/'}>
                            <Image
                                alt=''
                                className='Logo'
                                src={logo}
                            />
                        </div>}
                        <Category color={color} />
                        <div className='HeaderInfo'>
                            <Search />
                            <div className='ButtonWrapperHeader'>
                                <button onClick={() => {
                                    window.location.href = `tel:${feedback.phone}`;
                                }} className='phonNumber'>
                                    <PhonSvg />
                                    {t('freeDelivery1')}
                                </button>
                            </div>
                        </div>
                        <Language />
                        <MobileSearchs
                            searchResultData={searchResultData}
                            setSearchResult={setSearchResult}
                            openMobilsSearch={openMobilsSearch}
                            setOpenMobileSearch={setOpenMobileSearch}
                            openMenuMobile={openMenuMobile}
                            value={value} setValue={setValue}
                            setOpenMenuMobile={setOpenMenuMobile}
                            searchResult={searchResult}
                        />
                    </div>
                </div>
                <div className='LineHeader' />
                {openMenuMobile && <MobileMenuComponent color={color} setOpen={() => setOpenMenuMobile(false)} />}
            </div>
        </div>
    )
}