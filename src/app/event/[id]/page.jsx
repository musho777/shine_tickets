"use client"
import { StatusPageReject } from '../../StatusPageReject';
import '../../StatusPageReject/styles.css'
import '../styles.css'

const StatusPageArca = () => {
  const queryString = window.location.search;

  const params = new URLSearchParams(queryString);

  const paymentCode = params.get('paymentCode');
  if (paymentCode == 0) {
    return <div className='statusDiv'>
      <div className='successPage'>
        <img src={'../../../assets/success.png'} alt='' />
        <h1>Շուտով կստանաք տոմսերը ձեր նշած էլ. հասցեին</h1>
      </div>
    </div>
  }
  else {
    return <StatusPageReject />
  }
}

export default StatusPageArca