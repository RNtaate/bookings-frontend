import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addMassageType } from '../../actions';
import { createMassage } from '../Helpers/FetchMethods';
import * as loginStyler from '../auth/stylesheets/Login.module.css';
import * as styles from './stylesheets/MassageForm.module.css';

const MassageForm = (props) => {
  const [localMassage, setLocalMassage] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 0,
    massageImage: null,
    createErrors: [],
  });

  const { updateCurrentMassageList, handleShowMassageForm } = props;

  const handleOnChange = (e) => {
    setLocalMassage({ ...localMassage, [e.target.name]: e.target.value });
  };

  const handleOnImageChange = (e) => {
    setLocalMassage({ ...localMassage, massageImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name, description, price, duration, massageImage,
    } = localMassage;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('duration', duration);
    formData.append('massage_image', massageImage);

    createMassage(formData)
      .then((response) => {
        if (response.data) {
          updateCurrentMassageList(response.data);
          props.handleShowMassageForm();
        }
      }).catch((e) => {
        if (e.response.status === 422) {
          setLocalMassage(
            { ...localMassage, createErrors: [...Object.entries(e.response.data.errors)] },
          );
        } else {
          setLocalMassage({ ...localMassage, createErrors: [['NetWork Error! ', 'Something went wrong, please try again.']] });
        }
      });
  };

  return (
    <div className={loginStyler.form_holder_div}>
      <button type="button" onClick={handleShowMassageForm} className={loginStyler.cancel_form_button}>
        <i className="far fa-times-circle" />
      </button>
      <h2>New Massage Type</h2>

      <ul>
        {
          localMassage.createErrors.length > 0
            ? localMassage.createErrors.map((error) => (
              <li key={localMassage.createErrors.indexOf(error)} className={loginStyler.error_message}>
                {error[0]}
                {' '}
                {error[1]}.
              </li>
            )) : null
        }
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name of Massage" required onChange={handleOnChange} value={localMassage.name} />
        <textarea name="description" placeholder="Massage Description" onChange={handleOnChange} required value={localMassage.description} className={styles.massage_textarea} resizable="false" />
        <input type="number" name="price" placeholder="Price" onChange={handleOnChange} required />
        <input type="number" name="duration" placeholder="Duration in minutes" onChange={handleOnChange} required />
        <input type="file" multiple={false} accept="image/*" required onChange={handleOnImageChange} />
        <button type="submit">Create Massage Type</button>
      </form>
    </div>
  );
};

MassageForm.propTypes = {
  handleShowMassageForm: PropTypes.func.isRequired,
  updateCurrentMassageList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateCurrentMassageList: (massageTypeObj) => {
    dispatch(addMassageType(massageTypeObj));
  },
});

export default connect(null, mapDispatchToProps)(MassageForm);
