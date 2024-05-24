import './styles.css'
import { Link } from 'react-router-dom'

export const StatusPageReject = () => {
    return <div className='container' id='statusDiv'>
        <div className='statusDiv'>

            <div>
                <img src={require('../../assets/oops.png')} alt='' />
            </div>

            <Link to={'/'} className='goHome'>Վերադառնալ գլխավոր էջ</Link>
        </div>
    </div>
}