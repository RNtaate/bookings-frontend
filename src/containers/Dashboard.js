import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import API_URL from './Helpers/HelperConstants';
import { addUser, removeUser } from '../actions/index';
import MassageForm from './ModelForms/MassageForm';
import { fetchLoggedInStatus, redirectToHome } from './Helpers/HelperMethods';
import MassageCard from '../components/MassageCard';

const Dashboard = (props) => {
  const { myUserObj, setCurrentUser, logoutCurrentUser } = props;

  const [showMassageForm, setShowMassageForm] = useState(false);

  const [massageList, setMassageList] = useState({
    list: [],
    listMessage: 'Fetching Massage Types ...',
  });

  const toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
  };

  const handleLogout = () => {
    axios.delete(`${API_URL}/destroy`, { withCredentials: true })
      .then(() => {
        logoutCurrentUser();
        redirectToHome(props);
      }).catch(() => {
        setMassageList({ list: [], listMessage: "Sorry, couldn't logout smoothly, Please refresh and try again" });
      });
  };

  const fetchMassageTypes = () => {
    axios.get(`${API_URL}/massages`)
      .then((response) => {
        setMassageList({ ...massageList, list: [...response.data] });
      }).catch(() => {
        setMassageList({ ...massageList, listMessage: 'Something went wrong, Could not fetch massage types. Please try again later' });
      });
  };

  useEffect(() => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props, fetchMassageTypes, setCurrentUser);
    } else {
      fetchMassageTypes();
    }
  }, []);

  if (myUserObj.user == null) {
    return (<p>Please wait while we verify your credentials ...</p>);
  }

  return (
    <div>
      {
        myUserObj.user ? (
          <div className="dashboard_div">

            <h2>
              Welcome
              {' '}
              {myUserObj.user.username}
              !
            </h2>
            <Link to="/appointments"><p><strong>My Appointments</strong></p></Link>
            <button type="button" onClick={handleLogout}>Logout</button>
            {
              myUserObj.user.id === 1
                ? <button type="button" onClick={toggleShowMassageForm}>Create New Massage Type</button>
                : null
            }

            {/** This is the new massage form */}
            {
              showMassageForm
                ? (
                  <MassageForm
                    handleShowMassageForm={toggleShowMassageForm}
                    handleFetchMassageTypes={fetchMassageTypes}
                  />
                ) : null
            }

            {
              massageList.list.length !== 0
                ? massageList.list.map((massage) => (
                  <MassageCard massageObj={massage} key={massage.id} />
                ))
                : massageList.listMessage
            }
          </div>
        )
          : null
      }
      <p>Dashboard for Norp Massage Parlor</p>
    </div>
  );
};

Dashboard.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
  logoutCurrentUser: () => {
    dispatch(removeUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
