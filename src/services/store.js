import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer/reducer';
import { thunk } from 'redux-thunk';

const bindMiddleware = middleware => {
  return applyMiddleware(...middleware);
};

const store = createStore(reducer, bindMiddleware([thunk]));

export default store;