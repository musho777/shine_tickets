import axios from "axios"
import { StartCreatTicket, StartGetCategoris, StartGetCategory, StartGetExpectedEvents, StartGetGeneralEvents, StartGetGetTopEvents, StartGetParonyanEvents, StartGetRadnomEvents, StartGetSinglPage, StartGetTelStatus, StartSearch, StartSubCategory, StartWeekEvents } from "./StartAction"
import { ErrorCreatTicket, ErrorGetCategoris, ErrorGetCategory, ErrorGetExpectedEvents, ErrorGetGeneralEvents, ErrorGetRandomEvetns, ErrorGetSubCategory, ErrorGetTelStatus, ErrorGetTopEvents, ErrorSearch, ErrorSinglPage, ErrorWeekEvents } from "./ErrorAction"
import { SuccessCreatTicket, SuccessGetAllAds, SuccessGetCategoris, SuccessGetCategory, SuccessGetEventValidity, SuccessGetExpectedEvents, SuccessGetFeedback, SuccessGetGeneralEvents, SuccessGetHall, SuccessGetParonyanEvetns, SuccessGetRandomEvents, SuccessGetSubCategory, SuccessGetTellStatus, SuccessGetTopEvents, SuccessSearch, SuccessSinglPage, SuccessWeekEvent, eventValidity } from "./SuccessAction"
import { MD5 } from "crypto-js";


const keys = "hYDepOnSarMi";
const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";


export const OpenCategoryMenu = (data) => {
    return {
        type: 'OpenCategoryMenu',
        data
    }
}

export const OpenCaldendar = (data) => {
    return {
        type: "OpenCaldendar",
        data
    }
}

export const GetFeedback = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getFeedback`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetFeedback(r.data.feedback))
            }
        })
            .catch((error) => {
            })
    }
}

export const GetTopEvents = (page) => {
    return (dispatch) => {
        dispatch(StartGetGetTopEvents())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getTopEvents?currentPage=${page}`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetTopEvents(r.data))
            }
            else {
                dispatch(ErrorGetTopEvents())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetTopEvents())
            })
    }
}

export const GetGenerealEvents = () => {
    return (dispatch) => {
        dispatch(StartGetGeneralEvents())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getGeneralEvents`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetGeneralEvents(r.data.events))
            }
            else {
                dispatch(ErrorGetGeneralEvents())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetGeneralEvents())
            })
    }
}

export const GetSinglPage = (id) => {
    return (dispatch) => {
        dispatch(StartGetSinglPage())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/singleEvent/${id}`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessSinglPage(r.data))
            } else {
                dispatch(ErrorSinglPage())
            }
        })
            .catch((error) => {
                dispatch(ErrorSinglPage())
            })
    }
}

export const SearchAction = (search) => {
    return (dispatch) => {
        dispatch(StartSearch())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/search`, { search: search }).then((r) => {
            if (r.data.success) {
                dispatch(SuccessSearch(r.data.events))
            }
            else {
                dispatch(ErrorSearch())
            }
        })
            .catch((error) => {
                dispatch(ErrorSearch())
            })
    }
}


export const GetAllEvents = (page, data) => {

    return (dispatch) => {
        dispatch(StartGetCategoris())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/filterEvents?currentPage=${page}`, data).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetCategoris(r.data))
            }
            else {
                dispatch(ErrorGetCategoris())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetCategoris())
            })
    }
}

export const GetAllEvents2 = (page, data) => {

    return (dispatch) => {
        dispatch(StartGetCategoris())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/getAllEvents?currentPage=${page}`, data).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetCategoris(r.data))
            }
            else {
                dispatch(ErrorGetCategoris())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetCategoris())
            })
    }
}

export const GetRandomEvents = (page) => {
    return (dispatch) => {
        dispatch(StartGetRadnomEvents())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/randomEvents?currentPage=${page}`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetRandomEvents(r.data.allEvents, r.data.totalPages))
            }
            else {
                dispatch(ErrorGetRandomEvetns())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetRandomEvetns())
            })
    }
}

export const SetTicketsAction = (data) => {
    return {
        type: 'SetTicketsAction',
        data
    }
}

export const RemoveTicketsAction = (data) => {
    return {
        type: 'RemoveTicketsAction',
        data
    }
}

export const GetCategory = () => {
    return (dispatch) => {
        dispatch(StartGetCategory())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getCategories`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetCategory(r.data.categories))
            }
            else {
                dispatch(ErrorGetCategory())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetCategory())
            })
    }
}

export const SubCategory = (data) => {
    return (dispatch) => {
        dispatch(StartSubCategory())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/getSubcategories`, data).then((r) => {
            dispatch(SuccessGetSubCategory(r.data.category))
        })
            .catch((error) => {
                dispatch(ErrorGetSubCategory())
            })
    }
}

export const GetHall = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getAllHalls`).then((r) => {
            dispatch(SuccessGetHall(r.data.halls))
        })
    }
}

export const RemoveAllTickets = () => {
    return {
        type: 'RemoveAllTickets'
    }
}

export const ChangeLanguageAction = (data) => {
    localStorage.setItem('lang', data)
    return {
        type: 'ChangeLanguageAction',
        data
    }
}


export const GetAllAds = () => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getAllAds`).then((r) => {
            dispatch(SuccessGetAllAds(r.data))
        })
    }
}

export const CreateCurrentTicket = (data, res, selectPay) => {
    return (dispatch) => {
        dispatch(StartCreatTicket())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/createCurrentTicket`, data).then((r) => {
            if (r.data.success) {
                if (selectPay === 1) {
                    window.open(`${res?.data?.formUrl}`)
                }
                dispatch(SuccessCreatTicket(r))
            }
            else {
                dispatch(ErrorCreatTicket())
            }
        })
            .catch((error) => {
                dispatch(ErrorCreatTicket())
            })
    }
}


// export const GetCurrentTicket = () => {
//     return (dispatch) => {
//         axios.post(`${process.env.REACT_APP_HOSTNAME}/getCurrentTicket`, { orderId: localStorage.getItem('orderId') })
//             .then(res => {
//                 if (res.data.success) {
//                     dispatch(ButTickets(res.data.ticket))
//                 }
//             })
//             .catch((error) => {
//             })
//     }
// }

export const StatusSuccessAction = () => {
    return {
        type: "StatusSuccessAction",
    }
}

export const StatusErrorAction = () => {
    return {
        type: "StatusErrorAction",
    }
}

export const ClearStatusAction = () => {
    return {
        type: 'ClearStatusAction'
    }
}

export const AddDate = (data) => {
    return {
        type: 'AddDate',
        data
    }
}

export const ClearDataBuy = () => {
    return {
        type: 'ClearDataBuy'
    }
}


export const BuyTickets = (data) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_HOSTNAME}/buyTicket`, data)
            .then(r => {
                localStorage.removeItem('orderId')
                // if (r.data.success) {
                // }
            })
            .catch((error) => {
            })
    }
}

export const GetTicketStatus = (data) => {
    return (dispatch) => {
        dispatch(StartGetTelStatus())
        axios.post(`${process.env.REACT_APP_HOSTNAME}/getTicketStatus`, data).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetTellStatus(r.data))
            }
            else {
                dispatch(ErrorGetTelStatus())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetTelStatus())
            })
    }
}

export const GetParonyanEvents = () => {
    const requestType = "getEvent";
    const params = {};
    const sortedParams = Object.fromEntries(Object.entries(params).sort());
    sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();
    const options = {
        method: 'POST',
        url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: { ...sortedParams },
    };
    return async (dispatch) => {
        dispatch(StartGetParonyanEvents())

        const response = await axios(options)
        dispatch(SuccessGetParonyanEvetns(response.data))
    }
}

export const GetParoninaSinglHallSeats = () => {
    const keys = "hYDepOnSarMi";
    const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    const requestType = "getRow";
    const params = {
        group_id: "12",
        timeline_id: "6936",
        event_id: "100",
    };
    const sortedParams = Object.fromEntries(Object.entries(params).sort());
    sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

    const options = {
        method: 'POST',
        url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: JSON.stringify(sortedParams),
    };

    return async (dispatch) => {
        const response = await axios(options)
    }
}

export const GetSinglParonyan = () => {
    const keys = "hYDepOnSarMi";
    const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";
    const requestType = "getEvent";
    const params = {
        group_id: "12",
        timeline_id: "6929",
        event_id: "97",
    };
    const sortedParams = Object.fromEntries(Object.entries(params).sort());
    sortedParams.token = MD5(Object.values(sortedParams).join('|') + '|' + keys).toString();

    const options = {
        method: 'POST',
        url: `https://api.haytoms.am/sync/${secretKey}/${requestType}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        data: JSON.stringify(sortedParams),
    };

    return async (dispatch) => {
        const response = await axios(options)
    }
}

// export const ReturnTickets = () =>{

// }

export const WeekEvetntApi = () => {
    return (dispatch) => {
        dispatch(StartWeekEvents())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getEventsOfTheWeek`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessWeekEvent(r.data.weeklyEvents))
            }
            else {
                dispatch(ErrorWeekEvents())
                // dispatch(ErrorGetTopEvents())
            }
        })
            .catch((error) => {
                dispatch(ErrorWeekEvents())
                // dispatch(ErrorGetTopEvents())
            })
    }
}

export const GetExpectedEvents = () => {
    return (dispatch) => {
        dispatch(StartGetExpectedEvents())
        axios.get(`${process.env.REACT_APP_HOSTNAME}/getAllUpcomingEvents`).then((r) => {
            if (r.data.success) {
                dispatch(SuccessGetExpectedEvents(r.data.upcomingEvents))
            }
            else {
                dispatch(ErrorGetExpectedEvents())
            }
        })
            .catch((error) => {
                dispatch(ErrorGetExpectedEvents())
            })
    }
}






export const ActiveSeans = (data) => {
    return {
        type: 'ActiveSeans',
        data
    }
}

export const ClearSeans = () => {
    return {
        type: 'ClearSeans'
    }
}