const store = {
    events: [],
    loading: false,
    error: ''
}
export const GetExpectedEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetExpectedEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessGetExpectedEvents':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorGetExpectedEvents':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}