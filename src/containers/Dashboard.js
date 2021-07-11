import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addUser, addMassageList } from '../actions/index';
import MassageForm from './ModelForms/MassageForm';
import { fetchLoggedInStatus } from './Helpers/HelperMethods';
import MassageCard from '../components/MassageCard';
import { getMassageTypes } from './Helpers/FetchMethods';
import Sidebar from '../components/Sidebar';
import * as styles from './stylesheets/Dashboard.module.css';

const Dashboard = (props) => {
  const {
    myUserObj, myMassageList, setCurrentUser, setCurrentMassageList,
  } = props;

  const [showMassageForm, setShowMassageForm] = useState(false);

  const [listErrorMessage, setListErrorMessage] = useState('Fetching Massge Types ...');

  const toggleShowMassageForm = () => {
    setShowMassageForm(!showMassageForm);
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
    <div className="main-section-div">
      <Sidebar parentProps={props}/>
      {
        myUserObj.user ? (
          <div className={styles.dashboard_massages_div}>

            <h2>Massage Types</h2>
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
            <p>Dashboard for Norp Massage Parlor</p>
          </div>
        )
          : null
      }
    </div>
  );
};

Dashboard.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  myMassageList: PropTypes.instanceOf(Array).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
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
  setCurrentMassageList: (massageListArray) => {
    dispatch(addMassageList(massageListArray));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
