import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

import { createDateToday, fetchLoggedInStatus } from '../Helpers/HelperMethods';
import { addUser } from '../../actions/index';
import API_URL from '../Helpers/HelperConstants';

const AppointmentForm = (props) => {
  const cities = ['Kampala', 'Arua', 'Gayaza', 'New York', 'Dehli', 'Lagos'];

  const {
    myUserObj, massage, handleShowAppForm, setCurrentUser,
  } = props;

  const [localApt, setLocalApt] = useState({
    customerName: '',
    massageType: massage.name,
    massageId: massage.id,
    date: '',
    city: 'Kampala',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleOnChange = (e) => {
    setLocalApt(
      { ...localApt, customerName: myUserObj.user.username, [e.target.name]: e.target.value },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      customerName, massageType, massageId, date, city,
    } = localApt;
    axios.post(`${API_URL}/appointments`, {
      customer_name: customerName,
      massage_type: massageType,
      massage_id: massageId,
      date,
      city,
    }, { withCredentials: true })
      .then(() => {
        setErrorMessage('');
        setLocalApt({ ...localApt, date: '', city: 'Kampala' });
        props.propsObj.history.push('/appointments');
      }).catch(() => {
        setErrorMessage('Oops!, Something went wrong, check your network and try again.');
      });
  };

  useEffect(async () => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props, () => {}, setCurrentUser);
    }

    if (myUserObj.loggedInStatus === 'LOGGED IN') {
      setLocalApt({ ...localApt, customerName: myUserObj.user.username });
    }
  }, []);

  return (
    <div>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" placeholder="Preferred Date" onChange={handleOnChange} min={createDateToday()} required value={localApt.date} />
        <select name="city" onChange={handleOnChange} value={localApt.city}>
          {cities.map((city) => <option key={cities.indexOf(city)}>{city}</option>)}
        </select>
        <button type="submit" data-testid="appointmentFormSubmitButton">Create Appointment</button>
      </form>
      <button type="button" onClick={handleShowAppForm}>Cancel</button>
    </div>
  );
};

AppointmentForm.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  propsObj: PropTypes.instanceOf(Object).isRequired,
  massage: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  handleShowAppForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myUserObj: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userObj) => {
    dispatch(addUser(userObj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentForm);
