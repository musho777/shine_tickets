const store = {
    events: [],
    loading: false,
    error: ''
}
export const SearchReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartSearch':
            temp.loading = true
            temp.error = ''
            temp.events = []
            break;
        case 'SuccessSearch':
            temp.loading = false
            temp.error = ''
            temp.events = action.data
            break
        case 'ErrorSearch':
            temp.loading = false
            temp.error = ''
            temp.events = ''
            break
        default:
            return temp;
    }
    return temp;
}