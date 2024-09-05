"use client"
import { useEffect, useState } from 'react';
import '../styles.css'
import '../../Single/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetHallAction, GetSinglPage } from '../../../services/action/action';
import { CartPopup } from '../../../components/popup/cart';
import { BuyNow } from '../../../components/BuyNow';
import { PuffLoader } from 'react-spinners';
import DynamicMeta from '@/src/components/DinamicMetaData';
import { Recomentation } from '@/src/components/Recomentation';
import { Card } from '../compoennt/Card';
import { TicketPrice } from '../compoennt/TicketPrice';
import { Hall } from '../compoennt/hall';
import { PriceColor } from '../compoennt/priceColor';

const BuyTickets = ({ params }) => {
  const dispatch = useDispatch()
  const getSinglPage = useSelector((st) => st.getSinglPage)
  const { language } = useSelector((st) => st.StaticReducer)
  const [open, setOpen] = useState(false)
  const [showTickets, setShowTickets] = useState(false)
  const [color, setColor] = useState()
  const tickets = useSelector((st) => st.tiketsForBuy)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (getSinglPage.events) {
      dispatch(GetHallAction(getSinglPage.events, language))
    }
  }, [getSinglPage.events])

  useEffect(() => {
    if (params.id && language) {
      dispatch(GetSinglPage(params.id, language))
    }
  }, [params.id, language])


  useEffect(() => {
    let price = 0
    tickets.tickets?.map((elm, i) => {
      price += +elm.price
    })
    setTotal(price)
  }, [tickets])


  const ChoosePrice = (color) => {
    setColor(color)
  }


  if (getSinglPage?.loading) {
    return (
      <div className='loading'>
        <PuffLoader color="#FEE827" />
      </div>
    )
  }
  return <>
    <DynamicMeta
      keywords={getSinglPage.events.keyword}
      title={getSinglPage.events.name}
      description={getSinglPage.events.description}
    />
    <div className='container'>
      {open && <CartPopup
        open={open}
        type='openBuy'
        setOpen={() => {
          setOpen(false)
        }}
      >
        <BuyNow event={getSinglPage.events} data_id={getSinglPage.events.dates} open={open} />
      </CartPopup >}
      <PriceColor ChoosePrice={(e) => ChoosePrice(e)} data={getSinglPage.events.color} claseName='ticketPrice' />
      <div className='BuyTicketsWrapper'>
        <Card data={getSinglPage.events} id={"mobileBuyTicketsCard"} />
        <PriceColor data={getSinglPage.events.color} claseName='ticketPriceMobile' />
        {showTickets ?
          <TicketPrice tickets={tickets.tickets} total={total} setOpen={e => setOpen(e)} /> :
          <Hall setShowTickets={(e) => setShowTickets(e)} color={color} />
        }
        <div className='BuyTicketsCardWrapperDiv'>
          <div className='BuyTicketsCardWrapper'>
            <Card data={getSinglPage.events} />
            <TicketPrice tickets={tickets.tickets} total={total} setOpen={e => setOpen(e)} />
          </div>
        </div>
      </div>
      <Recomentation />
    </div >
  </>
}

export default BuyTickets