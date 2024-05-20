const store = {
    ads: [],
    loading: false,
    error: ''
}
export const GetAdsReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'SuccessGetAllAds':
            temp.loading = true
            temp.error = ''
            temp.ads = action.data?.ads
            break;
        default:
            return temp;
    }
    return temp;
}