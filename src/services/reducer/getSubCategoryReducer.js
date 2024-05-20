const store = {
    data: {},
    loading: false,
    error: ''
}
export const GetSubCategoryReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'StartSubCategory':
            temp.loading = true
            temp.error = ''
            temp.data = {}
            break;
        case 'SuccessGetSubCategory':
            temp.loading = false
            temp.error = ''
            temp.data = action.data
            break
        case 'ErrorGetSubCategory':
            temp.loading = false
            temp.error = ''
            temp.data = {}
            break
        default:
            return temp;
    }
    return temp;
}