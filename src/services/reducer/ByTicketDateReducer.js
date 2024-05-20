const store = {
    data: [],
}
export const ByTicketDateReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'AddDate':
            temp.data = action.data
            break;
        case 'ClearDataBuy':
            temp.data = []
            break
        default:
            return temp;
    }
    return temp;
}