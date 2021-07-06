import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import massageReducer from './MassageReducer';

const allReducers = combineReducers({
  userReducer,
  massageReducer,
});

export default allReducers;
