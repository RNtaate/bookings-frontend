import React from 'react';
import ReactDOM from 'react-dom';

import Login from '../../../containers/auth/Login';
import renderWithRedux from '../../CustomRender/RenderWithRedux';

const initialState = {
  user: null,
  loggedInStatus: false
}

it ("renders correctly", () => {
  const comp = renderWithRedux(<Login />);
  const el = comp.getByTestId('logFormButton');

  expect(el).toHaveTextContent("Login");
});