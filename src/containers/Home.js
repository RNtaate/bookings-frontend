import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Registration from './auth/Registration';
import Login from './auth/Login';

const Home = (props) => {
  const { myUserObj } = props;

  const [showRegForm, setShowRegForm] = useState(false);

  const toggleShowRegForm = () => {
    setShowRegForm(!showRegForm);
  };

  const redirect = () => {
    props.history.push('/');
  };

  return (
    <div className="home_div">
      <h1>This is the home component</h1>
      { myUserObj.user != null
        ? (
          <h2>
            Username:
            {myUserObj.user.username}
          </h2>
        ) : null}
      <button type="button" onClick={toggleShowRegForm}>Sign up</button>
      <div>
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

      <div>
        <Login redirect={redirect} />
      </div>
    </div>
  );
};

Home.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

export default connect(mapStateToProps, null)(Home);
