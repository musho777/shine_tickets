import './style.css'
import { useDispatch } from 'react-redux'
import { OpenCategoryMenu } from '../../services/action/action'

export const CategoryMenu = ({ close, item, onClick }) => {
    const dispatch = useDispatch()

    return (
        <div className="categoryMenu">
            {item.map((elm, i) => (
                <div
                    key={i}
                    onClick={() => {
                        close()
                        dispatch(OpenCategoryMenu(false))
                        onClick(elm)
                    }}
                >
                    {elm?.hall}
                </div>
            ))}
        </div>
    )
}