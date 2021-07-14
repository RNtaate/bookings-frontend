import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser } from '../../actions/index';
import { logInUser } from '../Helpers/FetchMethods';
import * as styler from './stylesheets/Login.module.css';
import loader from '../../assets/loading_1.gif';

const Login = (props) => {
  const { toggleShowLoginForm } = props;

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    errorMessage: '',
  });

  const [loading, setLoading] = useState(null);

  const handleOnchange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(loader);

    const { username, password } = loginDetails;

    logInUser({
      user: {
        username,
        password,
      },
    })
      .then((response) => {
        setLoading(null);
        props.setCurrentUser(response.data.user);
        if (response.data.user) {
          setLoginDetails({
            username: '',
            password: '',
            errorMessage: '',
          });
          toggleShowLoginForm();
          props.redirect();
        }
      }).catch((e) => {
        setLoading(null);
        if (e.response) {
          if (e.response.status === 403) {
            setLoginDetails({ ...loginDetails, errorMessage: e.response.data.error });
          } else {
            setLoginDetails({ ...loginDetails, errorMessage: 'Network Error!, Please try again later' });
          }
        } else {
          setLoginDetails({ ...loginDetails, errorMessage: 'Network Error!, Please try again later' });
        }
      });
  };

  return (
    <div className={styler.form_holder_div}>
      <button type="button" className={styler.cancel_form_button} onClick={toggleShowLoginForm}>
        <i className="far fa-times-circle" />
        {' '}
      </button>
      <h2>Login</h2>
      <p className={styler.error_message}>{loginDetails.errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={loginDetails.username} onChange={handleOnchange} required />
        <input type="password" name="password" placeholder="Password" value={loginDetails.password} onChange={handleOnchange} required />
        <button type="submit" data-testid="logFormButton">Login</button>
      </form>
      {
        loading === null
          ? null : <img src={loading} alt="Something borrowed" />
      }
    </div>
  );
};

Login.defaultProps = {
  redirect: () => {},
};

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  redirect: PropTypes.func,
  toggleShowLoginForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
});

export default connect(null, mapDispatchToProps)(Login);
