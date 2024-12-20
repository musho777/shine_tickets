const store = {
    events: {},
    loading: true,
    error: ''
}
export const GetSinglPageReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetSinglPage':
            temp.loading = true
            temp.error = ''
            temp.events = {}
            break;
        case 'SuccessSinglPage':
            temp.loading = false
            temp.error = ''
            temp.events = action.data.data
            break
        case 'ErrorSinglPage':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}