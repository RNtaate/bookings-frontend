import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import API_URL from '../Helpers/HelperConstants';

const MassageForm = (props) => {
  const [localMassage, setLocalMassage] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 0,
    massageImage: null,
    createErrors: [],
  });

  const { handleShowMassageForm } = props;

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

    axios({
      method: 'post',
      url: `${API_URL}/massages`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response)
        if (response.data.massage) {
          props.handleFetchMassageTypes();
          props.handleShowMassageForm();
        }
      }).catch((e) => {
        console.log(e.response);
        if (e.response.status === 422) {
          setLocalMassage(
            { ...localMassage, createErrors: [...Object.entries(e.response.data.errors)] }
          );          
        }
        else {
          setLocalMassage({ ...localMassage, createErrors: [['NetWork Error! ', 'Something went wrong, please try again.']] });          
        }
      });
  };

  return (
    <div>
      <h3>New Massage Type</h3>

      <ul>
        {
          localMassage.createErrors.length > 0
            ? localMassage.createErrors.map((error) => (
              <li key={localMassage.createErrors.indexOf(error)}>
                {error[0]}
                {' '}
                {error[1]}
              </li>
            )) : null
        }
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name of Massage" required onChange={handleOnChange} value={localMassage.name} />
        <textarea name="description" placeholder="Massage Description" onChange={handleOnChange} required value={localMassage.description} />
        <input type="number" name="price" placeholder="Price" onChange={handleOnChange} required />
        <input type="number" name="duration" placeholder="Duration in minutes" onChange={handleOnChange} required />
        <input type="file" multiple={false} accept="image/*" required onChange={handleOnImageChange} />
        <button type="submit">Create Massage Type</button>
      </form>
      <button type="button" onClick={handleShowMassageForm}>Cancel</button>
    </div>
  );
};

MassageForm.propTypes = {
  handleShowMassageForm: PropTypes.func.isRequired,
  handleFetchMassageTypes: PropTypes.func.isRequired,
};

export default MassageForm;
