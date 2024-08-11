import { combineReducers } from 'redux'
import { Ticket_reducer } from './ticket_reducer'
import { Event_reducer } from './event_reducer'
import { StaticReducer } from './staticReducer'
import { GetTopEventsReducer } from './getTopEventsReducer'
import { GetGeneralEventsReducer } from './getGeneralEventsReducer'
import { GetSinglPageReducer } from './getSinglPageReducer'
import { SearchReducer } from './searchReducer'
import { GetAllEventsReducer } from './getAllEventsReducer'
import { TicketsForBuyReducer } from './TicketsForBuyReducer'
import { GetCategoryReducer } from './getCategoryReducer'
import { GetSubCategoryReducer } from './getSubCategoryReducer'
import { GetRadnomEventsReducer } from './getRadnomEventsReducer'
import { GetAdsReducer } from './getAllAdsReducer'
import { StatusReducer } from './StatusReducer'
import { ByTicketDateReducer } from './ByTicketDateReducer'
import { GetTelReducerStatus } from './GetTelReducerStatus'
import { CreatTicketReducer } from './CreatTicketReducer'
import { GetWeekEventReducer } from './GetWeekEventReducer'
import { GetParonyanEventsReducer } from './GetParonyanEventsReducer'
import { GetExpectedEventsReducer } from './GetExpectedEventsReducer'
import { ActiveSeansReducer } from './ActiveSeansReducer'
import { GetHallActionRecuer } from './GetHallActionRecuer'

const reducer = combineReducers({
    Ticket_reducer,
    Event_reducer,
    StaticReducer,
    topEvents: GetTopEventsReducer,
    general: GetGeneralEventsReducer,
    getSinglPage: GetSinglPageReducer,
    search: SearchReducer,
    getAllEventes: GetAllEventsReducer,
    tiketsForBuy: TicketsForBuyReducer,
    getCategory: GetCategoryReducer,
    getSubCAtegory: GetSubCategoryReducer,
    getRandomEvents: GetRadnomEventsReducer,
    getAds: GetAdsReducer,
    status: StatusReducer,
    byTicketDate: ByTicketDateReducer,
    getTell: GetTelReducerStatus,
    creatTicket: CreatTicketReducer,
    getWeekEvent: GetWeekEventReducer,
    paronyanEvents: GetParonyanEventsReducer,
    getExpectedEvents: GetExpectedEventsReducer,
    activeSeans: ActiveSeansReducer,
    getHall: GetHallActionRecuer
})

export default reducer