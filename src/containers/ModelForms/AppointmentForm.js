import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createDateToday } from '../Helpers/HelperMethods';
import { addUser } from '../../actions/index';
import { createAppointment, fetchLoggedInStatus } from '../Helpers/FetchMethods';
import * as loginStyles from '../auth/stylesheets/Login.module.css';
import * as styles from './stylesheets/AppointmentForm.module.css';
import loader from '../../assets/loading_1.gif';

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

  const [loading, setLoading] = useState(null);

  const handleOnChange = (e) => {
    setLocalApt(
      { ...localApt, customerName: myUserObj.user.username, [e.target.name]: e.target.value },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(loader);
    setErrorMessage('');

    const {
      customerName, massageType, massageId, date, city,
    } = localApt;

    createAppointment({
      customer_name: customerName,
      massage_type: massageType,
      massage_id: massageId,
      date,
      city,
    })
      .then(() => {
        setLoading(null);
        setErrorMessage('');
        setLocalApt({ ...localApt, date: '', city: 'Kampala' });
        props.propsObj.history.push('/appointments');
      }).catch(() => {
        setLoading(null);
        setErrorMessage('Oops!, Something went wrong, check your network and try again.');
      });
  };

  useEffect(async () => {
    if (myUserObj.loggedInStatus === 'NOT LOGGED IN') {
      fetchLoggedInStatus(props.propsObj, () => {}, setCurrentUser);
    }

    if (myUserObj.loggedInStatus === 'LOGGED IN') {
      setLocalApt({ ...localApt, customerName: myUserObj.user.username });
    }
  }, []);

  return (
    <div className={loginStyles.form_holder_div}>
      <button type="button" onClick={handleShowAppForm} className={loginStyles.cancel_form_button}>
        <i className="far fa-times-circle" />
      </button>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" placeholder="Preferred Date" onChange={handleOnChange} min={createDateToday()} required value={localApt.date} />

        <div className={styles.appForm_select_div}>
          <select name="city" onChange={handleOnChange} value={localApt.city}>
            {cities.map((city) => <option key={cities.indexOf(city)}>{city}</option>)}
          </select>
          <div />
        </div>

        <button type="submit" data-testid="appointmentFormSubmitButton">Book Now</button>
      </form>

      {loading === null ? null : <img src={loading} alt="" />}
    </div>
  );
};

AppointmentForm.defaultProps = {
  propsObj: {},
  handleShowAppForm: () => {},
};

AppointmentForm.propTypes = {
  myUserObj: PropTypes.instanceOf(Object).isRequired,
  propsObj: PropTypes.instanceOf(Object),
  massage: PropTypes.instanceOf(Object).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  handleShowAppForm: PropTypes.func,
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
