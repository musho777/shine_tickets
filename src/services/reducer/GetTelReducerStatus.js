const store = {
    data: {},
    loading: true,
    error: ''
}
export const GetTelReducerStatus = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartGetTelStatus':
            temp.loading = true
            temp.error = ''
            temp.data = {}
            break;
        case 'SuccessGetTellStatus':
            temp.loading = false
            temp.error = ''
            temp.data = action.data
            break
        case 'ErrorGetTelStatus':
            temp.loading = false
            temp.error = ''
            temp.data = {}
            break
        default:
            return temp;
    }
    return temp;
}