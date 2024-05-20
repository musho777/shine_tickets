import store from "../store/staticStore"

export const StaticReducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'OpenCategoryMenu':
            temp.categoryMenu = action.data
            break;
        case 'ChangeLanguageAction':
            temp.language = action.data
            break
        case 'OpenCaldendar':
            temp.openCalendar = action.data
        default:
            return temp;
    }
    return temp;
}