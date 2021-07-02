import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Registration from '../../../containers/auth/Registration';

it('renders without crashing', () => {
  const myDiv = document.createElement('div');

  ReactDOM.render(<Registration showRegForm toggleShowRegForm={() => {}} />, myDiv);
});

it('renders correctly', () => {
  const { getByTestId } = render(<Registration showRegForm toggleShowRegForm={() => {}} />);
  expect(getByTestId('regFormButton')).toHaveTextContent('Sign Up');
});
