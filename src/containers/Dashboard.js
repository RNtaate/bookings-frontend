import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {API_URL} from './Helpers/HelperConstants';
import {addUser, removeUser} from '../actions/index';
import MassageForm from './ModelForms/MassageForm';

let Dashboard = (props) => {

  let {myUserObj, setCurrentUser, logoutCurrentUser} = props;

  let [showMassageForm, setShowMassageForm] = useState(false);

  let redirectToHome = () => {
    props.history.push("/home");
  }

  let toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
  }

  let handleLogout = () => {
    console.log('You clicked the logout button');
    axios.delete(`${API_URL}/logout`, {withCredentials: true})
    .then(response => {
      console.log("I want to log out", response);
      logoutCurrentUser();
      redirectToHome();
    }).catch( error => {
      console.log("Sorry, couldn't logout smoothly, please try again", error);
    })
  }

  useEffect(() => {
    if (myUserObj.loggedInStatus === "NOT LOGGED IN") {
      axios.get(`${API_URL}/logged_in`, {withCredentials: true})
      .then( response => {
        console.log("From the Dashboard: ",response)
        if(response.data.logged_in) {
          setCurrentUser(response.data.user);
        }
        else {
          console.log('You are not logged in!, so I am taking you to the login/sign up page.');
          redirectToHome();
        }
      }).catch( error => {
        console.log('Something went wrong', error)
        console.log('So I am kindly going to redirect you to the home page.')
        redirectToHome();
      })
    }
  }, []);

  return (
    <div>
      {
        myUserObj.user ?(
          <div className="dashboard_div">

            <h2>Welcome {myUserObj.user.username}!</h2>
            <button onClick={handleLogout}>Logout</button>
            {
              myUserObj.user.id == 1 ?
              <button onClick={toggleShowMassageForm}>Create New Massage Type</button>
              : null
            }
            {showMassageForm ? <MassageForm handleShowMassageForm={toggleShowMassageForm}/> : null}
          </div>
        )
        : null
      }
      <p>Dashboard for Norp Massage Parlor</p>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

let mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentUser: (userObj) => {
      dispatch(addUser(userObj));
    },
    logoutCurrentUser: () => {
      dispatch(removeUser());
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);