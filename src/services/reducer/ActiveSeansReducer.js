const store = {
    data: '',
}
export const ActiveSeansReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'ActiveSeans':
            temp.data = action.data
            break;
        // case 'ClearSeans':
        //     temp.data = ''
        //     break
        default:
            return temp;
    }
    return temp;
}