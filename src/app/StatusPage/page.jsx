"use client"
import '../StatusPageReject/styles.css'
import { PuffLoader } from 'react-spinners'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTicketStatus } from '../../services/action/action'
import { StatusPageReject } from '../StatusPageReject'

const StatusPage = ({ params }) => {
    console.log(params)
    const dispatch = useDispatch()
    // const orderId = router.query.order;
    // let orderId = window.location?.href?.split('order=')[1]
    useEffect(() => {
        dispatch(GetTicketStatus({ orderId }))
    }, [])

    const { getTell } = useSelector((st) => st)


    if (getTell.loading) {
        return <div className='loading'>
            <PuffLoader color="#FEE827" />
        </div>
    }


    if (getTell.data.status === 'PAID') {
        return <div className='statusDiv'>
            <div className='successPage'>
                <img src={require('../../assets/success.png')} alt='' />
                <h1>Շուտով կստանաք տոմսերը ձեր նշած էլ. հասցեին</h1>
                {/* <h1>Խնդրում ենք էջը չփակել</h1> */}
            </div>
        </div>
    }
    else {
        return <StatusPageReject />
    }
    return <div></div>
}

export default StatusPage