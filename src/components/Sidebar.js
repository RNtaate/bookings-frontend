import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as styles from './stylesheets/Sidebar.module.css';
import { addMassageList, removeUser } from '../actions';
import { logOutUser } from '../containers/Helpers/FetchMethods';
import { redirectToHome } from '../containers/Helpers/HelperMethods';
import logo from '../assets/norp_vespa.png';

function Sidebar(props) {
  const {
    myUserObj, logoutCurrentUser, setCurrentMassageList, parentProps,
  } = props;

  const [logoutErrorMessage, setLogoutErrorMessage] = useState('');

  const currentPath = window.location.pathname;
  const pathArray = currentPath.split('/');

  const sideBarLinks = [
    {
      title: 'MASSAGES',
      pathname: '/',
      match: 'massage',
    },
    {
      title: 'APPOINTMENTS',
      pathname: '/appointments',
      match: 'appointments',
    },
  ];

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
        <img src={logo} alt="" className={styles.logo_img} />
        {myUserObj.user !== null ? (
          <h3>
            Hi,
            {myUserObj.user.username}
          </h3>
        ) : null}
      </div>

      <div className={styles.sidebar_middle_div}>
        <ul>
          {
            sideBarLinks.map((singleLink) => (
              <li key={sideBarLinks.indexOf(singleLink)}>
                <Link to={singleLink.pathname} className={styles.link}>
                  <div className={(singleLink.pathname === currentPath) || (pathArray.includes(singleLink.match)) ? styles.selected : ''}>
                    {singleLink.title}
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>

        <button type="button" onClick={handleLogout} className={styles.sidebar_logout_button}>
          LOGOUT
          <i className="fas fa-sign-out-alt" />
        </button>
        <p>{logoutErrorMessage}</p>
      </div>

      <div className={styles.sidebar_footer_div}>
        <div className={styles.icons_div}>
          <i className="fab fa-twitter" />
          <i className="fab fa-facebook-f" />
          <i className="fab fa-google-plus-g" />
          <i className="fab fa-vimeo-v" />
          <i className="fab fa-pinterest-p" />
        </div>
        <p>&copy; 2021 Norp Massage Parlor</p>
      </div>

    </div>
  );
}

Sidebar.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  logoutCurrentUser: PropTypes.func.isRequired,
  setCurrentMassageList: PropTypes.func.isRequired,
  parentProps: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

const mapDispatchToProps = (dispatch) => (
  {
    logoutCurrentUser: () => {
      dispatch(removeUser());
    },
    setCurrentMassageList: (massageListArray) => {
      dispatch(addMassageList(massageListArray));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
