const store = {
    events: [],
    loading: false,
    error: ''
}
export const GetGeneralEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetGeneralEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessGetGeneralEvents':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorGetGeneralEvents':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}
