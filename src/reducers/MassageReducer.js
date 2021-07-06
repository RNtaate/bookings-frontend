import { massageListInitialState } from './InitialStates';

let massageReducer = (state = massageListInitialState, action) => {
  switch (action.type) {
    case "ADD_MASSAGE_LIST":
      return [ ...action.payload];
    case "ADD_MASSAGE_TYPE":
      return (state.concat(action.payload));
    default:
      return state
  }
}

export default massageReducer;