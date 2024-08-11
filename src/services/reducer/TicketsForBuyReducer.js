const store = {
    tickets: [],
}
export const TicketsForBuyReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'SetTicketsAction':
            temp.tickets.push(action.data)
            break;
        case 'RemoveTicketsAction':
            const index = temp.tickets.findIndex(({ id }) => id == action.data.id);
            temp.tickets.splice(index, 1)
            break
        case 'RemoveAllTickets':
            temp.tickets = []
            break
        default:
            return temp;
    }
    return temp;
}