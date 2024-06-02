import '../StatusPage/styles.css'
import Image from 'next/image'

const DeliveryStatusPage = () => {
    return <div className='container' id='statusDiv'>
        < div className='successPage' >
            <Image
                src={require('../../assets/success.png')} alt='#' />
            <h1>Շնորհակալություն գնման համար, մեր օպերատորը կկապվի Ձեզ հետ</h1>
        </div >
    </div >
}

export default DeliveryStatusPage