import { SearchMobileSvg, MobileMenu, SearchSvg } from "@/src/components/svg"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

const MobileSearchs = ({
  searchResultData,
  openMobilsSearch,
  setOpenMobileSearch,
  openMenuMobile,
  setOpenMenuMobile,
  value,
  setValue,
  searchResult,
  setSearchResult
}) => {
  const { language } = useSelector((st) => st.StaticReducer)
  const [inputFocus, setINputFocus] = useState(false)
  const search = useSelector((st) => st.search)

  const searchRef = useRef(null);
  const inputRef = useRef(null)
  const { t } = useTranslation()
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setINputFocus(false)
        setSearchResult(false)
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

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


  function truncateText(text) {
    if (text?.length > 13) {
      return text.substring(0, 10) + '...';
    }
    else {
      return text;
    }
  }
  return <div className='MobileHeaderWrapper'>

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
        <div className='MobileSearchInputSvg'>
          <SearchSvg />
        </div>
        <input
          value={value}
          ref={inputRef}
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
          onClick={(e) => { }}
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
              return <div ref={searchRef} key={i} onClick={() => window.location = `/Single/${elm?.eventId._id}/${elm?.eventId?.title}`}>
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
}
export default MobileSearchs