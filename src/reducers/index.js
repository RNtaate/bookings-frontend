import {combineReducers} from 'redux';

import userReducer from './UserReducer';

let allReducers = combineReducers({
  userReducer: userReducer,
})

export default allReducers;