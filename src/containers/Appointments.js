import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchLoggedInStatus } from './Helpers/HelperMethods';
import { addUser } from '../actions';
import { getAppointmentsList } from './Helpers/FetchMethods';

const Appointments = (props) => {
  const { myUserObj, setCurrentUser } = props;

  const [localAppointments, setLocalAppointmnets] = useState({
    appsList: [],
    errorMessage: 'Fetching appointments ...',
  });

  const fetchAppointmentsList = () => {
    getAppointmentsList()
      .then((res) => {
        if (res.data.length > 0) {
          setLocalAppointmnets({ ...localAppointments, appsList: [...res.data], errorMessage: 'I have been replaced' });
        } else {
          setLocalAppointmnets({ ...localAppointments, errorMessage: 'Sorry Buddy! You have no booked appointments' });
        }
      }).catch(() => {
        setLocalAppointmnets({ ...localAppointments, errorMessage: 'Something went wrong. This might be due to Network error!' });
      });
  };

  useEffect(() => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props, fetchAppointmentsList, setCurrentUser);
    } else {
      fetchAppointmentsList();
    }
  }, []);

  return (
    <div>
      <h4 data-testid="appointments-test-heading">YOUR BOOKED APPOINTMENTS</h4>
      {
        localAppointments.appsList.length > 0
          ? (
            <table>
              <thead>
                <tr>
                  <th>MASSAGE TYPE</th>
                  <th>CITY</th>
                  <th>DATE</th>
                  <th>CUSTOMER NAME</th>
                </tr>
              </thead>
              <tbody>
                {localAppointments.appsList.map((app) => (
                  <tr key={localAppointments.appsList.indexOf(app)}>
                    <td>{app.massage_type}</td>
                    <td>{app.city}</td>
                    <td>{app.date}</td>
                    <td>{app.customer_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
          : <p>{localAppointments.errorMessage}</p>
      }
    </div>
  );
};

Appointments.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

const mapDispatchToProps = (dispatch) => (
  {
    setCurrentUser: (userObj) => {
      dispatch(addUser(userObj));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);
