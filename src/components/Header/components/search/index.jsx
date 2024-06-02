import { SearchSvg } from "@/src/components/svg"
import { SearchAction } from "@/src/services/action/action";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const Search = () => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('')
  const [inputFocus, setINputFocus] = useState(false)
  const [searchResult, setSearchResult] = useState(false)
  const [searchResultData, setSearchResultDAta] = useState(false)
  const { language } = useSelector((st) => st.StaticReducer)
  const dispatch = useDispatch()
  const search = useSelector((st) => st.search)
  const searchRef = useRef(null)
  const { t } = useTranslation()

  function truncateText(text) {
    if (text?.length > 13) {
      return text.substring(0, 10) + '...';
    }
    else {
      return text;
    }
  }

  useEffect(() => {
    if (value) {
      dispatch(SearchAction(value))
    }
  }, [value, dispatch])
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


  return <div className='SearchDiv'>
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
    <div ref={searchRef} id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
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
          return <div key={i}
            onClick={() => window.location = `/Single/${elm?.eventId._id}/${elm?.eventId?.title}`}
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
}