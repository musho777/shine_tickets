const store = {
    events: [],
    loading: false,
    error: ''
}
export const GetTopEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetGetTopEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessGetTopEvents':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorGetTopEvents':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}