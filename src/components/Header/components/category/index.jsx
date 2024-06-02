import { useSelector } from "react-redux"
import { useParams } from 'next/navigation'

export const Category = ({ }) => {
  const params = useParams()
  const id = params.id ? params.id[1] : "";
  const getCategory = useSelector((st) => st.getCategory)
  const { language } = useSelector((st) => st.StaticReducer)
  return <div className='textWrapper'>
    {getCategory.category.map((elm, i) => {
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
      return <div key={i} className='CateogryName'>
        <p onClick={() => { window.location = (`/Category/${elm?.name}/${elm?._id}`) }
        } className='Headertext'>{title}</p>
        <div
          className={id == elm?._id ? 'activeHeader' : 'notActiveHeader'}
          style={id == elm?._id ? { backgroundColor: bg } : {}}
        />
      </div>
    })}
  </div>
}