import { SearchAction } from "@/src/services/action/action";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export const Input = ({ searchResult, setSearchResult, setSearchResultDAta }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const [inputFocus, setINputFocus] = useState(false)
  const { t } = useTranslation()
  const { language } = useSelector((st) => st.StaticReducer)

  const searchRef = useRef(null)



  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchResult) {
        setSearchResultDAta(true)
        inputRef.current.focus()
      }
    }, 300);

    const timeoutId1 = setTimeout(() => {
      if (!searchResult) {
        setINputFocus(false)
      }
    }, 1200);

    if (!searchResult) {
      setSearchResultDAta(false)
    }

    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId);
    };
  }, [searchResult]);

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

  const Search = (value) => {
    console.log(value)
    dispatch(SearchAction(value, language))
    setValue(value)
  }
  const HendelClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setINputFocus(true)
    setSearchResult(true)
  }



  return <input
    ref={inputRef}
    value={value}
    onChange={(e) => Search(e.target.value)}
    onClick={(e) => { HendelClick(e) }}
    placeholder={t('Searchforanevent')}
    id={inputFocus ? 'SearchInput' : ''}
    className='SearchInput'
  />
}