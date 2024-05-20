const store = {
    events: [],
    loading: false,
    totalPages: 0,
    error: ''
}
export const GetRadnomEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetRadnomEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            temp.totalPages = 0
            break;
        case 'SuccessGetRandomEvents':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            temp.totalPages = action.totalPages
            break
        case 'ErrorGetRandomEvetns':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            temp.totalPages = 0
            break
        default:
            return temp;
    }
    return temp;
}