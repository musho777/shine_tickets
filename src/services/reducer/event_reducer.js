import store from "../store/event_store"

export const Event_reducer = (state = store, action) => {
    let temp = { ...state }
    switch (action.type) {
        case 'eventValidity':
            if (action.data?.validity) {
                temp.valid = true
            } else {
                temp.valid = false
            }
            break;
        case 'SuccessGetFeedback':
            temp.feedback = action.data
            break;
        default:
            return temp;
    }
    return temp;
}