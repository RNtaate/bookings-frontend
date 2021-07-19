import React from 'react';

import Login from '../../../containers/auth/Login';
import renderWithRedux from '../../CustomRender/RenderWithRedux';

it('renders correctly', () => {
  const comp = renderWithRedux(<Login />);
  const el = comp.getByTestId('logFormButton');

  expect(el).toHaveTextContent('Login');
});
