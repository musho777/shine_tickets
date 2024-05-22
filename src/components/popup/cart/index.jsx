import './style.css'
import { useEffect } from 'react'
import { CloseIcon } from '../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveAllTickets } from '../../../services/action/action'

export const CartPopup = ({ open, setOpen, children, openCard, show = true, type, openBuy, }) => {
    const dispatch = useDispatch()
    const tickets = useSelector((st) => st.tiketsForBuy)

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        }
    }, [open])

    const Close = () => {
        document.body.style.overflow = 'auto'
        setOpen(false)
        if (type == 'hall') {
            dispatch(RemoveAllTickets())
        }
    }
    return (
        <div className={open ? 'activePopup' : 'inactive'}>
            <div className='pop' >
                <div className='close' onClick={() => Close()}>
                    <CloseIcon />
                </div>
                {children}

                {type == 'hall' && tickets.tickets.length > 0 &&
                    show &&
                    <div className='cartLine' onClick={() => {
                        if (!openBuy) {
                            openCard()
                        }
                    }
                    }>
                        Continue
                    </div>
                }

            </div>
        </div>
    )
}