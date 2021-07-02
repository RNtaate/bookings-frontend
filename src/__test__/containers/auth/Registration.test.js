import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Registration from '../../../containers/auth/Registration';

it ('renders without crashing', () => {
  let myDiv = document.createElement('div');

  ReactDOM.render(<Registration />, myDiv);
});

it('renders correctly', () => {
  let {getByTestId} = render(<Registration showRegForm={true} toggleShowRegForm={() => {}}/>);
  expect(getByTestId('regFormButton')).toHaveTextContent('Sign Up');
})