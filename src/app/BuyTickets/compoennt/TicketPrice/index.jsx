import { ClearSvg } from "@/src/components/svg";
import { RemoveTicketsAction } from "@/src/services/action/action";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const TicketPrice = ({ tickets, total, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  return <div className='Tickets'>
    <div className='TicketsHeader'>
      <p>{t('Ticket')}</p>
      <p>{t('Price')}</p>
    </div>
    <div className='TicketBody'>
      {
        tickets?.map((elm, i) => {
          return <div key={i} className='TikcetsWrapper'>
            <div className='TicketDiv'>
              <div className='TicketInfoo'>
                <p>{elm.seat.name}</p>
                <div>
                  <p>{t('Line')}: <span>{elm.seat.row}</span></p>
                  <p>{t('Place')}: <span>
                    {elm.seat.column}
                  </span></p>
                </div>
              </div>
              <p className='TicketPrcie'>{elm.price} AMD</p>
              <div className='ClewarTicet' onClick={() => dispatch(RemoveTicketsAction(elm))}>
                <ClearSvg />
              </div>
            </div>
          </div>
        })
      }


      <div className='TotalPrice'>
        <p className='Totalp'>{t('TOTALLY')}</p>
        <p className='ToatalPricep'>{total} AMD</p>
      </div>
      <div className='totalLine' />
      <div className='BuyTicketButtonWrapper'>
        <button
          disabled={tickets?.length == 0}
          className={tickets?.length == 0 ? 'disableButton' : ''} onClick={() => setOpen(true)}>{t('Next')}</button>
      </div>
    </div>
  </div>
} 