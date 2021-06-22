import React, {useState} from 'react';
import { connect } from 'react-redux';

import Registration from './auth/Registration';
import Login from './auth/Login';

let Home = (props) => {

  let [showRegForm, setShowRegForm] = useState(false);

  let toggleShowRegForm = () => {
    setShowRegForm(!showRegForm);
  }

  return (
    <div className="home_div">
      <h1>This is the home component</h1>
      { props.myUserObj.user != null ? 
        <h2>Username: {props.myUserObj.user.username}</h2> : null
      }
      <button onClick={toggleShowRegForm}>Sign up</button>
      <div>
        {
          showRegForm == true ? 
          <Registration showRegForm={showRegForm} toggleShowRegForm={toggleShowRegForm}/> : null
        }
      </div>

      <div>
        <Login />
      </div>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

export default connect(mapStateToProps, null)(Home);