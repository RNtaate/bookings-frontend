import React from 'react';

import AppointmentForm from '../../../containers/ModelForms/AppointmentForm';
import renderWithRedux from '../../CustomRender/RenderWithRedux';

const initialState = {
  userReducer: {
    user: {
      username: 'Thunder',
      password_digest: '232rwrweiuoe8fwewe',
    },
    loggedInStatus: 'LOGGED IN',
  },
};

const massageObj = {
  name: 'Some Massage',
  id: 1,
};

test('renders the AppointmentForm correctly without crashing', () => {
  const comp = renderWithRedux(<AppointmentForm massage={massageObj} />, { initialState });
  const el = comp.getByTestId('appointmentFormSubmitButton');

  expect(el).toHaveTextContent('Create Appointment');
});
