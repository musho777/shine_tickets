import { SearchMobileSvg, MobileMenu, SearchSvg } from "@/src/components/svg"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { SearchBody } from "../search/searchBody"

const MobileSearchs = ({
  openMobilsSearch,
  setOpenMobileSearch,
  openMenuMobile,
  setOpenMenuMobile,
  value,
  searchResult,
  setSearchResult,
  SearchFunction
}) => {
  const [inputFocus, setINputFocus] = useState(false)
  const search = useSelector((st) => st.search)

  const inputRef = useRef(null)
  const { t } = useTranslation()
  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      setINputFocus(false)
      setSearchResult(false)
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
            SearchFunction(e.target.value)
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
          {searchResult && <div>
            {search?.events.map((elm, i) => {
              return <SearchBody key={i} data={elm} />
            })}
          </div>}
          {
            search?.events?.length == 0 && !search.loading &&
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