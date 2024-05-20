const store = {
    events: [],
    loading: false,
    error: ''
}
export const GetWeekEventReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartWeekEvents':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessWeekEvent':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorWeekEvents':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}