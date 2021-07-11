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

  let currentPath = window.location.pathname;
  let pathArray = currentPath.split('/');

  const sideBarLinks = [
    {
      title: 'MASSAGES',
      pathname: '/',
      match: 'massages',
    },
    {
      title: 'APPOINTMENTS',
      pathname: '/appointments',
      match: 'appointments',
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
      <div className={styles.sidebar_header_div}>
        <h2>Norp</h2>
        <h3>Hi, {myUserObj.user.username}</h3>
      </div>

      <div className={styles.sidebar_middle_div}>
        <ul>
          {
            sideBarLinks.map( (singleLink) => {
              return (
                <li key={sideBarLinks.indexOf(singleLink)}>
                  <Link to={singleLink.pathname} className={styles.link}>
                    <div className={(singleLink.pathname === currentPath) || (pathArray.includes(singleLink.match)) ? styles.selected : ''}>
                      {singleLink.title}
                    </div>
                  </Link>
                </li>
              )
            })
          }
        </ul>

        <button type="button" onClick={handleLogout} className={styles.sidebar_logout_button}>LOGOUT <i className="fas fa-sign-out-alt"></i></button>
        <p>{logoutErrorMessage}</p>
      </div>

      <div className={styles.sidebar_footer_div}>
        <div className={styles.icons_div}>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-google-plus-g"></i>
          <i className="fab fa-vimeo-v"></i>
          <i className="fab fa-pinterest-p"></i>
        </div>
        <p>&copy; 2021 Norp Massage Parlor</p>
      </div>

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
