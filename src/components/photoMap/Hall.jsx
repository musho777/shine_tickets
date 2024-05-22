import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveAllTickets, SetTicketsAction } from '../../services/action/action'

function countOccurrences(arr, itemToCount) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === itemToCount) {
            count++
        }
    }
    return count
}

export const Hall = ({ section, title, buy }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const tickets = useSelector((st) => st.tiketsForBuy)
    const [value, setValue] = useState([])
    const [price, setPrice] = useState(section[0].price)
    useEffect(() => {
        let item = [...value]
        price?.forEach(elm => {
            item.push({ value: 0, price: elm.price, _id: elm.row })
        })
        setValue(item)
    }, [])

    const AddTicket = (i, e, price, type) => {
        dispatch(RemoveAllTickets())
        let item = [...value]
        item[i].value = e
        value?.forEach(elm => {
            for (let i = 0; i < elm?.value; i++) {
                dispatch(SetTicketsAction({
                    row: type,
                    price: elm?.price,
                    bench: 0,
                    id: elm._id
                }))
            }
        })
        setValue(item)
    }

    useEffect(() => {
        let item = [...value]
        value.map((elm, i) => {
            let count = countOccurrences(tickets.tickets, elm._id)
            item[i].value = count
        })
        if (item.length > 0) {
            setValue(item)
        }
    }, [tickets])

    return (
        <div>
            <p className='HallBuyTicket'>Buy Ticket</p>
            {price?.map((elm, i) => (
                <div key={i} className='HallWithoutSeat'>
                    <div className='HallWithoutSeatText'>
                        <p className='HallTitle'>{elm.type} </p>
                        <p className='HallPice'>Price:{elm?.price}</p>
                    </div>
                    <div className='HallWithoutSeatButton'>
                        <input onChange={(e) => AddTicket(i, e.target.value, elm?.price, elm.type)}
                            value={value[i]?.value}
                            type='number' />
                    </div>
                </div>
            ))}
            <div className='ButtonHallWrapper'>
                <Button onClick={buy} title={t('BuyNow')} />
            </div>
        </div>
    )
}