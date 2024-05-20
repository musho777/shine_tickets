const store = {
    status: 0
}
export const StatusReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StatusSuccessAction':
            temp.status = 2
            break
        case 'StatusErrorAction':
            temp.status = 1
            break
        case 'ClearStatusAction':
            temp.status = 0
            break;
        default:
            return temp;
    }
    return temp;
}