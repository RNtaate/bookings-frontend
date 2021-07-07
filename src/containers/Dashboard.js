import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addUser, removeUser, addMassageList } from '../actions/index';
import MassageForm from './ModelForms/MassageForm';
import { fetchLoggedInStatus, redirectToHome } from './Helpers/HelperMethods';
import MassageCard from '../components/MassageCard';
import { logOutUser, getMassageTypes } from './Helpers/FetchMethods';

const Dashboard = (props) => {
  const {
    myUserObj, myMassageList, setCurrentUser, logoutCurrentUser, setCurrentMassageList,
  } = props;

  const [showMassageForm, setShowMassageForm] = useState(false);

  const [listErrorMessage, setListErrorMessage] = useState('Fetching Massge Types ...');

  const toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        logoutCurrentUser();
        redirectToHome(props);
      }).catch(() => {
        setCurrentMassageList([]);
        setListErrorMessage("Sorry couldn't logout smoothly, Please refresh and try again");
      });
  };

  const fetchMassageTypes = () => {
    getMassageTypes()
      .then((response) => {
        setCurrentMassageList([...response.data]);
      }).catch(() => {
        setListErrorMessage('Something went wrong, Could not fetch massage types. Please try again later');
      });
  };

  useEffect(() => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props, fetchMassageTypes, setCurrentUser);
    } else if (myMassageList.length === 0) {
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
                  />
                ) : null
            }

            {
              myMassageList.length !== 0
                ? myMassageList.map((massage) => (
                  <MassageCard massageObj={massage} key={massage.id} />
                ))
                : listErrorMessage
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
  myMassageList: PropTypes.instanceOf(Array).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  logoutCurrentUser: PropTypes.func.isRequired,
  setCurrentMassageList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
  myMassageList: state.massageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
  logoutCurrentUser: () => {
    dispatch(removeUser());
  },
  setCurrentMassageList: (massageListArray) => {
    dispatch(addMassageList(massageListArray));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
