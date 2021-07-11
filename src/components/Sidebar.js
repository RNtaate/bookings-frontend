import React, { useState } from 'react'
import * as styles from './stylesheets/Sidebar.module.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMassageList, removeUser } from '../actions';
import {logOutUser} from '../containers/Helpers/FetchMethods';
import {redirectToHome} from '../containers/Helpers/HelperMethods';

function Sidebar(props) {

  const {myUserObj, logoutCurrentUser, setCurrentMassageList, parentProps} = props;

  let [logoutErrorMessage, setLogoutErrorMessage] = useState("")

  const sideBarLinks = [
    {
      title: 'Massages',
      pathname: '/'
    },
    {
      title: 'Appointments',
      pathname: '/appointments'
    }
  ]

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        logoutCurrentUser();
        redirectToHome(parentProps);
      }).catch(() => {
        setCurrentMassageList([]);
        setLogoutErrorMessage("Sorry couldn't logout smoothly, Please refresh and try again");
      });
  };

  return (
    <div className={styles.sidebar_div}>
      <h2>Norp Massage Parlor</h2>
      <h3>Hi, {myUserObj.user.username}</h3>

      <ul>
        {
          sideBarLinks.map( (singleLink) => {
            return (
              <li key={sideBarLinks.indexOf(singleLink)}><Link to={singleLink.pathname}><div>{singleLink.title}</div></Link></li>
            )
          })
        }
      </ul>

      <button type="button" onClick={handleLogout}>Logout</button>
      <p>{logoutErrorMessage}</p>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

let mapDispatchToProps = (dispatch) => {
  return (
    {
      logoutCurrentUser : () => {
        dispatch(removeUser());
      },
      setCurrentMassageList : (massageListArray) => {
        dispatch(addMassageList(massageListArray));
      }
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
