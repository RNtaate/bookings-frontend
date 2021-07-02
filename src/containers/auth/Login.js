import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser } from '../../actions/index';
import API_URL from '../Helpers/HelperConstants';

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

    axios.post(`${API_URL}/sessions`, {
      user: {
        username,
        password,
      },
    }, { withCredentials: true })
      .then((response) => {
        props.setCurrentUser(response.data.user);
        if (response.data.user) {
          setLoginDetails({
            username: '',
            password: '',
            errorMessage: '',
          });

          props.redirect();
        } else {
          setLoginDetails({ ...loginDetails, errorMessage: 'Username or Password is wrong' });
        }
      }).catch(() => {
        setLoginDetails({ ...loginDetails, errorMessage: 'Network Error!, Please try again later' });
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

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
});

export default connect(null, mapDispatchToProps)(Login);
