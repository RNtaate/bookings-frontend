import React from 'react';
import Appointments from '../../containers/Appointments';

import renderWithRedux from '../CustomRender/RenderWithRedux';

const initialState = {
  userReducer: {
    user: {
      username: 'Thunder',
      password_digest: '232rwrweiuoe8fwewe',
    },
    loggedInStatus: 'LOGGED IN',
  },
};

it('renders correctly without crashing', () => {
  const comp = renderWithRedux(<Appointments />, { initialState });
  const el = comp.getByTestId('appointments-test-heading');

  expect(el).toHaveTextContent('YOUR BOOKED APPOINTMENTS');
});
