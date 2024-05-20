const store = {
    events: [],
    loading: false,
    error: ''
}
export const GetParonyanEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetParonyanEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessGetParonyanEvetns':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        default:
            return temp;
    }
    return temp;
}