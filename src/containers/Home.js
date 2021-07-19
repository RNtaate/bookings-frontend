import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Registration from './auth/Registration';
import Login from './auth/Login';
import * as styles from './stylesheets/Home.module.css';

const Home = (props) => {
  const [showRegForm, setShowRegForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleShowRegForm = () => {
    setShowRegForm(!showRegForm);
  };

  const toggleShowLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const redirect = () => {
    props.history.push('/');
  };

  return (
    <div className={styles.home_div}>
      <h1>NORP MASSAGE PARLOR</h1>

      <button type="button" onClick={toggleShowRegForm} className={styles.sign_up_button}>
        Sign up
        <i className="fas fa-user-plus" />
      </button>

      {/** This is the Sign up form */}
      <div className={styles.hover_form_div} style={{ visibility: showRegForm ? 'visible' : 'hidden', opacity: showRegForm ? 1 : 0 }}>
        {
          showRegForm === true
            ? (
              <Registration
                showRegForm={showRegForm}
                toggleShowRegForm={toggleShowRegForm}
              />
            ) : null
        }
      </div>

      <button type="button" onClick={toggleShowLoginForm}>
        Login
        <i className="fas fa-sign-in-alt" />
      </button>

      {/** This is the login form */}
      <div className={styles.hover_form_div} style={{ visibility: showLoginForm ? 'visible' : 'hidden', opacity: showLoginForm ? 1 : 0 }}>
        {
          showLoginForm === true
            ? (
              <Login
                showLoginForm={showLoginForm}
                toggleShowLoginForm={toggleShowLoginForm}
                redirect={redirect}
              />
            ) : null
        }
      </div>

    </div>
  );
};

Home.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

export default connect(mapStateToProps, null)(Home);
