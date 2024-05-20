const store = {
    status: false,
    loading: false,
    error: ''
}
export const CreatTicketReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'SuccessCreatTicket':
            temp.loading = false
            temp.error = ''
            temp.status = true
            break;
        case 'ErrorCreatTicket':
            temp.loading = false
            temp.error = ''
            temp.status = false
            break;
        case 'StartCreatTicket':
            temp.loading = true
            temp.error = ''
            temp.status = false
            break;
        default:
            return temp;
    }
    return temp;
}