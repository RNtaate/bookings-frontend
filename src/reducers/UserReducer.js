import { userInitialState } from './InitialStates';

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, user: action.payload, loggedInStatus: 'LOGGED IN' };
    case 'REMOVE_USER':
      return { ...state, user: null, loggedInStatus: 'NOT LOGGED IN' };
    default:
      return state;
  }
};

export default userReducer;
