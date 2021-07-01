import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {API_URL} from './Helpers/HelperConstants';
import {addUser, removeUser} from '../actions/index';
import MassageForm from './ModelForms/MassageForm';
import { fetchLoggedInStatus, redirectToHome } from './Helpers/HelperMethods';
import MassageCard from '../components/MassageCard';

let Dashboard = (props) => {

  let {myUserObj, setCurrentUser, logoutCurrentUser} = props;

  let [showMassageForm, setShowMassageForm] = useState(false);

  let [massageList, setMassageList] = useState({
    list: [],
    listMessage: "Fetching Massage Types ..."
  })

  let toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
  }

  let handleLogout = () => {
    console.log('You clicked the logout button');
    axios.delete(`${API_URL}/logout`, {withCredentials: true})
    .then(response => {
      console.log("I want to log out", response);
      logoutCurrentUser();
      redirectToHome(props);
    }).catch( error => {
      console.log("Sorry, couldn't logout smoothly, please try again", error);
    })
  }

  let fetchMassageTypes = () => {
    axios.get(`${API_URL}/massages`)
    .then( response => {
      console.log(response);
      setMassageList({ ...massageList, list: [ ...response.data]});
    }).catch(error => {
      console.log('something went wrong when fetching massage types', error);
      setMassageList({ ...massageList, listMessage: 'Something went wrong, Please try again later'});
    })
  }

  useEffect(() => {
    if (myUserObj.loggedInStatus === "NOT LOGGED IN") {
      fetchLoggedInStatus(props, fetchMassageTypes, setCurrentUser);
    }
    else{
      fetchMassageTypes();
    }
  }, []);

  return (
    <div>
      {
        myUserObj.user ?(
          <div className="dashboard_div">

            <h2>Welcome {myUserObj.user.username}!</h2>
            <Link to="/appointments"><p><strong>My Appointments</strong></p></Link>
            <button onClick={handleLogout}>Logout</button>
            {
              myUserObj.user.id == 1 ?
              <button onClick={toggleShowMassageForm}>Create New Massage Type</button>
              : null
            }

            {/**This is the new massage form */}
            {showMassageForm ? <MassageForm handleShowMassageForm={toggleShowMassageForm} handleFetchMassageTypes={fetchMassageTypes} /> : null}

            {
              massageList.list.length != 0 ?
              massageList.list.map( massage => {
                return (
                  <MassageCard massageObj={massage} key={massage.id}/>
                )
              })
              : massageList.listMessage
            }
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