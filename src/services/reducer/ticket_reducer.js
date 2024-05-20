import store from "../store/ticket_store"

export const Ticket_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'getSeat':
            temp.ticket = action.payload.seats
            break;
        case 'getSeatError':
            break;
        case 'checkoutSuccess':
            break;
        case 'checkoutError':
            break;
        default:
            return temp;
    }
    return temp;
}