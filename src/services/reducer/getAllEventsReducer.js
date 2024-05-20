const store = {
    events: [],
    loading: false,
    error: '',
    hall: []
}
export const GetAllEventsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetCategoris':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessGetCategoris':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorGetCategoris':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        case 'SuccessGetHall':
            temp.hall = action.data
            break
        default:
            return temp;
    }
    return temp;
}