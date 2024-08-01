import './styles.css'

export const StatusPageReject = () => {
  return <div className='container' id='statusDiv'>
    <div className='statusDiv'>
      <div>
        <img src={require('../../assets/oops.png')} alt='' />
      </div>
      <a href={'/'} className='goHome'>Վերադառնալ գլխավոր էջ</a>
    </div>
  </div>
}