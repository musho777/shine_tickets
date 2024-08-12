import { SearchSvg } from "@/src/components/svg"
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Input } from "../input";
import { SearchBody } from "./searchBody";

export const Search = () => {
  const [searchResult, setSearchResult] = useState(false)
  const [searchResultData, setSearchResultDAta] = useState(false)
  const search = useSelector((st) => st.search)
  const searchRef = useRef(null)
  const { t } = useTranslation()

  return <div className='SearchDiv'>
    <div className='SearchInputSvg'>
      <SearchSvg />
    </div>
    <Input setSearchResult={(e) => setSearchResult(e)} searchResult={searchResult} setSearchResultDAta={(e) => setSearchResultDAta(e)} />
    <div ref={searchRef} id={searchResult ? 'SearchResultActive' : ''} className='SearchResult'>
      {searchResultData &&
        <div onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}>
          {search.events.map((elm, i) => {
            return <SearchBody key={i} data={elm} />
          })}
        </div>
      }
      {search.events.length == 0 && <div className='notingNotFound'>
        <p>{t('NothingFound')}</p>
      </div>}
    </div>
  </div>
}