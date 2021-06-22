import React, {useState} from 'react';
import axios from 'axios';

import { API_URL } from '../Helpers/HelperConstants';

let Registration = (props) => {

  let [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    password_confirmation: '',
    reg_errors: []
  })

  let {showRegForm, toggleShowRegForm} = props;

  let handleOnChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    let {username, password, password_confirmation} = userDetails;

    axios.post(`${API_URL}/registrations`,{
      user: {
        username: username,
        password: password,
        password_confirmation: password_confirmation
      }
    }, {withCredentials: true} )
    .then( response => {

      if (response.data.status) {
        if (response.data.status != 500) {
          setUserDetails({
            username: '',
            password: '',
            password_confirmation: '',
            reg_errors: []
          });
          console.log('Registration response', response);
          toggleShowRegForm();
        }else {
          setUserDetails({ ...userDetails, reg_errors: [ ...Object.entries(response.data.errors)]})
        }
      }
    }).catch( error => {
      console.log("Error", error);
      setUserDetails({ ...userDetails, reg_errors: [["NetWork Error! ", "Something went wrong, please try again."]]})
    })
  }

  return (
    showRegForm ?(
    <>
      <div>
        <button onClick={toggleShowRegForm}>Cancel</button>
        <ul>
          {
            userDetails.reg_errors.length != 0 ?
            userDetails.reg_errors.map( error => <li>{error[0]} {error[1]}</li>) : ""
          }
        </ul>

        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={userDetails.username} onChange={handleOnChange} required/>
          <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleOnChange} required />
          <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={userDetails.password_confirmation} onChange={handleOnChange} required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>) : null
  )
}

export default Registration;