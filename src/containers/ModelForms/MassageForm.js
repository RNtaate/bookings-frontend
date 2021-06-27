import React, { useState } from 'react';
import axios from 'axios';

let MassageForm = (props) => {

  let [localMassage, setLocalMassage] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 0,
    massage_image: null
  })

  let {handleShowMassageForm} = props;

  let handleOnChange = (e) => {
    console.log('You changed something inside of the form input fields');
    setLocalMassage({ ...localMassage, [e.target.name]: e.target.value});
  }

  let handleOnImageChange = (e) => {
    setLocalMassage({ ...localMassage, massage_image: e.target.files[0]});
  }

  let handleSubmit =  (e) => {
    e.preventDefault();
    console.log('You submitted something');

    let {name, description, price, duration, massage_image} = localMassage;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("massage_image", massage_image)

    axios({
      method: "post",
      url: 'http://localhost:3001/massages',
      data: formData,
      headers: { "Content-Type": "multipart/form-data"},
      withCredentials: true
    })
    .then( response => {
      console.log(response);
      if(response.data.massage){
        props.handleFetchMassageTypes();
        props.handleShowMassageForm();
      }
    }).catch (error => {
      console.log('Something went wrong dude!', error);
    })

  }

  return (
    <div>
      <h3>New Massage Type</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name of Massage" required onChange={handleOnChange} value={localMassage.name} />
        <textarea name="description" placeholder="Massage Description" onChange={handleOnChange} required value={localMassage.description}></textarea>
        <input type="number" name="price" placeholder="Price" onChange={handleOnChange} required />
        <input type="number" name="duration" placeholder="Duration in minutes" onChange={handleOnChange} required />
        <input type="file" multiple={false} accept="image/*" required onChange={handleOnImageChange} />
        <button type="submit">Create Massage Type</button>
      </form>
      <button onClick={handleShowMassageForm}>Cancel</button>
    </div>
  )
}

export default MassageForm;