import React, {useState} from 'react';
import axios from 'axios';

let Registration = () => {

  let [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    password_confirmation: '',   
  })

  let handleOnChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    let {username, password, password_confirmation} = userDetails;

    axios.post("http://localhost:3001/registrations",{
      user: {
        username: username,
        password: password,
        password_confirmation: password_confirmation
      }
    }, {withCredentials: true} )
    .then( response => {
      setUserDetails({
        username: '',
        password: '',
        password_confirmation: '',   
      });
      console.log('Registration response', response);
    }).catch( error => {
      console.log("Error", error);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={userDetails.username} onChange={handleOnChange} required/>
        <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={handleOnChange} required />
        <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={userDetails.password_confirmation} onChange={handleOnChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Registration;