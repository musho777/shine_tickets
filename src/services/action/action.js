import axios from "axios"
import { StartCreatTicket, StartGetCategoris, StartGetCategory, StartGetExpectedEvents, StartGetGeneralEvents, StartGetGetTopEvents, StartGetHallAction, StartGetParonyanEvents, StartGetRadnomEvents, StartGetSinglPage, StartGetTelStatus, StartSearch, StartSubCategory, StartWeekEvents } from "./StartAction"
import { ErrorCreatTicket, ErrorGetCategoris, ErrorGetCategory, ErrorGetExpectedEvents, ErrorGetGeneralEvents, ErrorGetHallAction, ErrorGetRandomEvetns, ErrorGetSubCategory, ErrorGetTelStatus, ErrorGetTopEvents, ErrorSearch, ErrorSinglPage, ErrorWeekEvents } from "./ErrorAction"
import { SuccessCreatTicket, SuccessGetAllAds, SuccessGetCategoris, SuccessGetCategory, SuccessGetEventValidity, SuccessGetExpectedEvents, SuccessGetFeedback, SuccessGetGeneralEvents, SuccessGetHall, SuccessGetHallAction, SuccessGetParonyanEvetns, SuccessGetRandomEvents, SuccessGetSubCategory, SuccessGetTellStatus, SuccessGetTopEvents, SuccessSearch, SuccessSinglPage, SuccessWeekEvent, eventValidity } from "./SuccessAction"
import { MD5 } from "crypto-js";


const keys = "hYDepOnSarMi";
const secretKey = "cyJhbGcieiJIUdzI1Nir9eyJt2xglIyoiQWRdtsg";

const url = 'https://dev2.shinetickets.com/api/v1/'
const uuid = 'da98243f-9a26-48de-893a-40491b6619e2'

// const url = 'https://dev2.shinetickets.com/api/v1/'
// const uuid = 'b10d0461-7b04-498c-a193-6078465d4c30'


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
        axios.get(`${"https://api.shinetickets.com"}/getFeedback`).then((r) => {
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
        axios.get(`${"https://api.shinetickets.com"}/getTopEvents?currentPage=${page}`).then((r) => {
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

export const GetGenerealEvents = (lang) => {
    return (dispatch) => {
        dispatch(StartGetGeneralEvents())
        axios.get(`${url}${uuid}/slider-all-data?locale=${lang}`).then((r) => {
            if (r.status == '200') {
                dispatch(SuccessGetGeneralEvents(r.data.data))
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

export const GetSinglPage = (id, lang) => {
    return (dispatch) => {
        dispatch(StartGetSinglPage())
        axios.get(`${url}${uuid}/project-event-data?locale=${lang}&id=${id}`).then((r) => {
            dispatch(SuccessSinglPage(r.data))
        })
            .catch((error) => {
                dispatch(ErrorSinglPage())
            })
    }
}

export const SearchAction = (search, lang) => {
    return (dispatch) => {

        dispatch(StartSearch())
        if (search)
            axios.get(`${url}${uuid}/search-events-by-title-and-date?locale=${lang}&search=${search}`, { search: search }).then((r) => {
                dispatch(SuccessSearch(r.data.data))
            })
                .catch((error) => {
                    dispatch(ErrorSearch())
                })
    }
}


export const GetAllEvents = (page, data) => {

    return (dispatch) => {
        dispatch(StartGetCategoris())
        axios.post(`${"https://api.shinetickets.com"}/filterEvents?currentPage=${page}`, data).then((r) => {
            if (r.data.success) {
                // dispatch(SuccessGetCategoris(r.data))
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

export const GetAllEvents2 = (page, language, id = 'all') => {
    return (dispatch) => {
        dispatch(StartGetCategoris())
        axios.get(`${url}${uuid}/events-data-by-category?locale=${language}&category=${id}&page=${page}`)
            .then((r) => {
                dispatch(SuccessGetCategoris(r.data.data))
            })
            .catch((error) => {
                dispatch(ErrorGetCategoris())
            })
    }
}

export const GetRandomEvents = (page) => {
    return (dispatch) => {
        dispatch(StartGetRadnomEvents())
        axios.get(`${"https://api.shinetickets.com"}/randomEvents?currentPage=${page}`).then((r) => {
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

export const GetCategory = (lang) => {
    return (dispatch) => {
        dispatch(StartGetCategory())
        axios.get(`${url}${uuid}/category-title?locale=${lang}`).then((r) => {
            if (r.status == 200) {
                dispatch(SuccessGetCategory(r.data.data))
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
        axios.post(`${"https://api.shinetickets.com"}/getSubcategories`, data).then((r) => {
            dispatch(SuccessGetSubCategory(r.data.category))
        })
            .catch((error) => {
                dispatch(ErrorGetSubCategory())
            })
    }
}

export const GetHall = () => {
    return (dispatch) => {
        axios.get(`${"https://api.shinetickets.com"}/getAllHalls`).then((r) => {
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
        axios.get(`${"https://api.shinetickets.com"}/getAllAds`).then((r) => {
            dispatch(SuccessGetAllAds(r.data))
        })
    }
}

export const CreateCurrentTicket = (data, res, selectPay) => {
    return (dispatch) => {
        dispatch(StartCreatTicket())
        axios.post(`${"https://api.shinetickets.com"}/createCurrentTicket`, data).then((r) => {
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


export const GetHallAction = (data, locale) => {
    return (dispatch) => {
        dispatch(StartGetHallAction())
        if (data?.dates?.length)
            axios.get(`${url}${uuid}/map-and-seat-data-for-reserve?project_event_id=${data.id}&event_date_id=${data?.dates[0].id}&event_id=${data.id}&locale=${locale}`).then((r) => {
                dispatch(SuccessGetHallAction(r.data))

            })
                .catch((error) => {
                    dispatch(ErrorGetHallAction())
                })
    }
}

// export const GetCurrentTicket = () => {
//     return (dispatch) => {
//         axios.post(`${"https://api.shinetickets.com"}/getCurrentTicket`, { orderId: localStorage.getItem('orderId') })
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
        axios.post(`${"https://api.shinetickets.com"}/buyTicket`, data)
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
        axios.post(`${"https://api.shinetickets.com"}/getTicketStatus`, data).then((r) => {
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
        axios.get(`${"https://api.shinetickets.com"}/getEventsOfTheWeek`).then((r) => {
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
        axios.get(`${"https://api.shinetickets.com"}/getAllUpcomingEvents`).then((r) => {
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