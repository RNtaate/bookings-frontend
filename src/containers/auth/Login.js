import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser } from '../../actions/index';
import {logInUser} from '../Helpers/FetchMethods';

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    errorMessage: '',
  });

  const handleOnchange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = loginDetails;

    logInUser({
      user: {
        username,
        password,
      }
    })
    .then((response) => {
      props.setCurrentUser(response.data.user);
      if (response.data.user) {
        setLoginDetails({
          username: '',
          password: '',
          errorMessage: '',
        });

        props.redirect();
      }
    }).catch((e) => {
      if (e.response.status === 403) {
        setLoginDetails({ ...loginDetails, errorMessage: e.response.data.error });
      } else {
        setLoginDetails({ ...loginDetails, errorMessage: 'Network Error!, Please try again later' });
      }
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <p>{loginDetails.errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={loginDetails.username} onChange={handleOnchange} />
        <input type="password" name="password" placeholder="Password" value={loginDetails.password} onChange={handleOnchange} />
        <button type="submit" data-testid="logFormButton">Login</button>
      </form>
    </div>
  );
};

Login.defaultProps = {
  redirect: () => {},
};

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  redirect: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
});

export default connect(null, mapDispatchToProps)(Login);
