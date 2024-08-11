const store = {
  events: [],
  loading: false,
  error: ''
}
export const GetHallActionRecuer = (state = store, action) => {
  let temp = { ...state }
  switch (action.type) {
    case 'StartGetHallAction':
      temp.loading = true
      temp.error = ''
      temp.events = []
      break;
    case 'SuccessGetHallAction':
      temp.loading = false
      temp.error = ''
      temp.events = action.data
      break
    case 'ErrorGetHallAction':
      temp.loading = false
      temp.error = ''
      temp.events = ''
      break
    default:
      return temp;
  }
  return temp;
}
