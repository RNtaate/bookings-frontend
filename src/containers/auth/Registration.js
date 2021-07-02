import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import API_URL from '../Helpers/HelperConstants';

const Registration = (props) => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    passwordConfirmation: '',
    reg_errors: [],
  });

  const { showRegForm, toggleShowRegForm } = props;

  const handleOnChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirmation } = userDetails;

    axios.post(`${API_URL}/registrations`, {
      user: {
        username,
        password,
        password_confirmation: passwordConfirmation,
      },
    }, { withCredentials: true })
      .then((response) => {
        if (response.data.status) {
          if (response.data.status !== 500) {
            setUserDetails({
              username: '',
              password: '',
              passwordConfirmation: '',
              reg_errors: [],
            });
            toggleShowRegForm();
          } else {
            setUserDetails(
              { ...userDetails, reg_errors: [...Object.entries(response.data.errors)] },
            );
          }
        }
      }).catch(() => {
        setUserDetails({ ...userDetails, reg_errors: [['NetWork Error! ', 'Something went wrong, please try again.']] });
      });
  };

  return (
    showRegForm ? (
      <>
        <div>
          <button type="button" onClick={toggleShowRegForm}>Cancel</button>
          <ul>
            {
            userDetails.reg_errors.length !== 0
              ? userDetails.reg_errors.map((error) => (
                <li key={userDetails.reg_errors.indexOf(error)}>
                  {error[0]}
                  {' '}
                  {error[1]}
                </li>
              )) : ''
          }
          </ul>

          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={userDetails.username} onChange={handleOnChange} required />
            <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleOnChange} required />
            <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" value={userDetails.passwordConfirmation} onChange={handleOnChange} required />
            <button type="submit" data-testid="regFormButton">Sign Up</button>
          </form>
        </div>
      </>
    ) : null
  );
};

Registration.propTypes = {
  showRegForm: PropTypes.bool.isRequired,
  toggleShowRegForm: PropTypes.func.isRequired,
};

export default Registration;
