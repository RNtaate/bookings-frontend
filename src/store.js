import { createStore } from 'redux';

import allReducers from './reducers/index';

let store = createStore(allReducers);

export default store;