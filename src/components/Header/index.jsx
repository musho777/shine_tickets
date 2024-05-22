"use client"
import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ActiveArrowSvg, ArrowSvg, MobileMenu, PhonSvg, SearchMobileSvg, SearchSvg, WorldSvg } from '../svg'
import { ChangeLanguageAction, GetCategory, GetFeedback, SearchAction } from '../../services/action/action'
import { useTranslation } from 'react-i18next'
import { MobileMenuComponent } from '../MobileMenu'
import logo from '../../assets/logo.webp'
import Image from 'next/image'

export const Header = () => {
    const dispatch = useDispatch()
    const search = useSelector((st) => st.search)
    const getCategory = useSelector((st) => st.getCategory)
    const events = useSelector((st) => st.getAllEventes)

    const { language } = useSelector((st) => st.StaticReducer)
    const inputRef = useRef(null);
    const [openLanguage, setOpenLanguage] = useState(false)
    const [inputFocus, setINputFocus] = useState(false)
    const [value, setValue] = useState('')
    const [openMenuMobile, setOpenMenuMobile] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchResultData, setSearchResultDAta] = useState(false)

    const [disable, setDisable] = useState(false)
    const { t } = useTranslation()
    const searchRef = useRef()

    const feedback = useSelector(st => st.Event_reducer.feedback)
    const [openMobilsSearch, setOpenMobileSearch] = useState(false)
    const handleTouchStart = (e) => {
        e.preventDefault();
    };

    document.body.addEventListener('click', function () {
        setOpenLanguage(false)
        setSearchResult(false)
        setOpenMobileSearch(false)
    });

    useEffect(() => {
        setDisable(!events.loading)
    }, [events.loading])

    useEffect(() => {
        if (openMenuMobile) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'scroll';
        }
    }, [openMenuMobile])

    useEffect(() => {
        if (!openMobilsSearch) {
            setValue('')
        }
    }, [openMobilsSearch])

    function truncateText(text) {
        if (text?.length > 13) {
            return text.substring(0, 10) + '...';
        }
        else {
            return text;
        }
    }

    const { id } = useParams()
    useEffect(() => {
        if (value) {
            dispatch(SearchAction(value))
        }
    }, [value, dispatch])

    useEffect(() => {
        dispatch(GetCategory())
        dispatch(GetFeedback())
    }, [])

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

    useEffect(() => {
        if (searchResult) {
            inputRef.current.focus()
        }
        const timeoutId1 = setTimeout(() => {
            if (!searchResult) {
                setINputFocus(false)
            }
        }, 1200);
        return () => {
            clearTimeout(timeoutId1)
        };
    }, [searchResult])

    useEffect(() => {
        searchRef?.current?.focus()
    }, [openMobilsSearch])

    return (
        <div className='header'>
            <div className='MainHeaderDiv'>
                <div className='MainHeader'>
                    {!openMobilsSearch && <div onClick={() => window.location = '/'}>
                        <Image className='Logo' src={logo} />
                    </div>}
                    <div className='textWrapper'>
                        {getCategory.category.map(elm => {
                            let bg = ''
                            if (elm._id === "65ce7bcc25c566d4e297d2ec") {
                                bg = '#FF6969'
                            }
                            else if (elm._id === "65ce7c4a25c566d4e297d30b") {
                                bg = '#D943FF'
                            }
                            else if (elm._id === "65ce7d9d25c566d4e297d3f3") {
                                bg = '#FFCE00'
                            }
                            else if (elm._id === "65ce7e9f25c566d4e297d47c") {
                                bg = '#4DCF5F'
                            }

                            else {
                                bg = '#11AEF4'
                            }
                            let title = ''
                            if (language === 'am') {
                                title = elm.name
                            } else if (language === 'en') {
                                title = elm.name_en
                            } else if (language === 'ru') {
                                title = elm.name_ru
                            }
                            return <div className='CateogryName'>
                                <p onClick={() => {
                                    window.location = (`/Category/${elm?.name}/${elm?._id}`)
                                }
                                } className='Headertext'>{title}</p>
                                <div
                                    className={id == elm?._id ? 'activeHeader' : 'notActiveHeader'}

                                    style={id == elm?._id ? { backgroundColor: bg } : {}}

                                />
                            </div>
                        })}
                    </div>
                    <div className='HeaderInfo'>
                        <div className='SearchDiv'>
                            <div className='SearchInputSvg'>
                                <SearchSvg />
                            </div>

                            <input
                                ref={inputRef}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setINputFocus(true)
                                    setSearchResult(true)
                                }
                                } placeholder={t('Searchforanevent')}
                                id={inputFocus ? 'SearchInput' : ''}
                                className='SearchInput' />
                            <div id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
                                {searchResultData && <div onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()

                                }}>
                                    {value != '' && search.events.map((elm, i) => {
                                        let name = ''
                                        let description = ''
                                        if (language == 'am') {
                                            name = elm.eventId.title
                                            description = elm.description
                                        }
                                        else if (language == 'ru') {
                                            name = elm.eventId.title_ru
                                            description = elm.description_ru

                                        }
                                        else {
                                            name = elm.eventId.title_en
                                            description = elm.description_en

                                        }
                                        return <div
                                            key={i}
                                            onClick={() => window.location = `/single/${elm?.eventId._id}/${elm?.eventId?.title}`}
                                        >
                                            <div className='SearchResultDiv'>
                                                <div className='SearchResultDivInfo'>
                                                    <p>{truncateText(name)}</p>
                                                    <p className='SearchResultDivInfoMount'>{elm.date.slice(0, 10)}</p>
                                                </div>
                                                <div className='SearchResultDivInfoPrice'>
                                                    <p>{elm?.priceStart}-{elm.priceEnd} AMD</p>

                                                </div>
                                            </div>
                                            <div className='SearchResultDivLine' />

                                        </div>

                                    })}
                                </div>}
                                {search.events.length == 0 && <div className='notingNotFound'>
                                    <p>{t('NothingFound')}</p>
                                </div>}
                            </div>
                        </div>
                        <div className='ButtonWrapperHeader'>
                            <button onClick={() => {
                                window.location.href = `tel:${feedback.phone}`;
                            }} className='phonNumber'>
                                <PhonSvg />
                                {t('freeDelivery1')}
                            </button>
                        </div>
                    </div>
                    <div
                        id={openLanguage ? 'openLanguage' : ''}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            setOpenLanguage(true)
                        }
                        } className='LanguageDiv'>
                        <WorldSvg />
                        {localStorage.getItem('lang') === 'am'
                            ? <p>ՀԱՅ</p>
                            : localStorage.getItem('lang') === 'en'
                                ? <p>ENG</p>
                                : <p>РУС</p>
                        }
                        {openLanguage ?

                            <ActiveArrowSvg /> :
                            <ArrowSvg />
                        }
                        {openLanguage && <div className='SelectLanguage'>
                            <p onClick={() => dispatch(ChangeLanguageAction('am'))} >Հայերեն</p>
                            <p onClick={() => dispatch(ChangeLanguageAction('ru'))} >Русский</p>
                            <p onClick={() => dispatch(ChangeLanguageAction('en'))} >English</p>
                        </div>}
                    </div>
                    <div className='MobileHeaderWrapper'>
                        {!openMobilsSearch ?

                            <div className='MobileHeader'>
                                <div onClick={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setOpenMobileSearch(true)
                                }}>
                                    <SearchMobileSvg />
                                </div>
                                <div onClick={() => setOpenMenuMobile(!openMenuMobile)}>
                                    <MobileMenu />
                                </div>
                            </div> :
                            <div className='MobileSearchINputWrapper'>
                                <div
                                    className='MobileSearchInputSvg'>
                                    <SearchSvg />
                                </div>
                                <input
                                    value={value}
                                    ref={searchRef}
                                    id={inputFocus ? 'SearchInput' : ''}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setINputFocus(true)
                                        setSearchResult(true)
                                    }}
                                    className='MobileSearchINput'
                                    onTouchStart={handleTouchStart}
                                    onClick={(e) => {

                                    }}
                                />
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                    }}
                                    id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
                                    {searchResultData && <div>
                                        {value != '' && search?.events.map((elm, i) => {
                                            let name = ''
                                            let description = ''
                                            if (language == 'am') {
                                                name = elm.eventId.title
                                                description = elm.description
                                            }
                                            else if (language == 'ru') {
                                                name = elm.eventId.title_ru
                                                description = elm.description_ru

                                            }
                                            else {
                                                name = elm.eventId.title_en
                                                description = elm.description_en

                                            }
                                            return <div key={i} onClick={() => window.location = `/single/${elm?.eventId._id}/${elm?.eventId?.title}`}>
                                                <div className='SearchResultDiv'>
                                                    <div className='SearchResultDivInfo'>
                                                        <p>{truncateText(name)}</p>
                                                        <p className='SearchResultDivInfoMount'>{elm?.date.slice(0, 10)}</p>
                                                    </div>
                                                    <div className='SearchResultDivInfoPrice'>
                                                        <p>{elm?.priceStart}-{elm?.priceEnd} AMD</p>
                                                    </div>
                                                </div>
                                                <div className='SearchResultDivLine' />

                                            </div>

                                        })}
                                    </div>}
                                    {search?.events?.length == 0 && !search.loading &&
                                        <div className='notingNotFound'>
                                            <p>{t('NothingFound')}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='LineHeader' />
            {openMenuMobile && <MobileMenuComponent setOpen={() => setOpenMenuMobile(false)} />}
        </div>
    )
}