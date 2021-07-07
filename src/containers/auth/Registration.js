import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { signUpUser } from '../Helpers/FetchMethods';
import * as loginStyler from './stylesheets/Login.module.css';

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

    signUpUser({
      user: {
        username,
        password,
        password_confirmation: passwordConfirmation,
      },
    })
      .then((response) => {
        if (response.data.status) {
          setUserDetails({
            username: '',
            password: '',
            passwordConfirmation: '',
            reg_errors: [],
          });
          toggleShowRegForm();
        }
      }).catch((e) => {
        if (e.response.status === 422) {
          setUserDetails(
            { ...userDetails, reg_errors: [...Object.entries(e.response.data.errors)] },
          );
        } else {
          setUserDetails({ ...userDetails, reg_errors: [['NetWork Error! ', 'Something went wrong, please try again.']] });
        }
      });
  };

  return (
    showRegForm ? (
      <>
        <div className={loginStyler.form_holder_div}>
          <button type="button" className={loginStyler.cancel_form_button} onClick={toggleShowRegForm}>
            <i className="far fa-times-circle" />

          </button>
          <h2>Sign Up</h2>
          <ul>
            {
            userDetails.reg_errors.length !== 0
              ? userDetails.reg_errors.map((error) => (
                <li
                  key={userDetails.reg_errors.indexOf(error)}
                  className={loginStyler.error_message}
                >
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
