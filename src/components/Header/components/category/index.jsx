import { useSelector } from "react-redux"
import { useParams } from 'next/navigation'

export const Category = ({ color }) => {
  const params = useParams()
  const id = params.id ? params.id[1] : "";
  const getCategory = useSelector((st) => st.getCategory)

  return <div className='textWrapper'>
    {getCategory.category.map((elm, i) => {
      return <div key={i} className='CateogryName'>
        <p onClick={() => window.location = (`/Category/${elm?.name}/${elm?.id}`)} className='Headertext'>{elm.name}</p>
        <div
          className={id == elm?.id ? 'activeHeader' : 'notActiveHeader'}
          style={id == elm?.id ? { backgroundColor: color[i] } : {}}
        />
      </div>
    })}
  </div>
}