import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import {addUser} from '../../actions/index';
import { API_URL } from '../Helpers/HelperConstants';

let Login = (props) =>{

  let [loginDetails, setLoginDetails] = useState({
    username: '',
    password: '',
    errorMessage: ''
  })

  let handleOnchange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();

    let {username, password} = loginDetails;

    axios.post(`${API_URL}/sessions`, {
      user: {
        username: username,
        password: password,
      }
    }, {withCredentials: true})
    .then( response => {

      props.setCurrentUser(response.data.user);
      if (response.data.user) {

        console.log(response);
  
        setLoginDetails({
          username: '',
          password: '',
          errorMessage: ''
        })
      }
      else {
        console.log('Something went wrong dude!');
        setLoginDetails({ ...loginDetails, errorMessage: 'Username or Password is wrong'})
      }

    }).catch(error => {
      console.log('Something is wrong: ', error);
      setLoginDetails({ ...loginDetails, errorMessage: 'Network Error!, Please try again later'})
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <p>{loginDetails.errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={loginDetails.username} onChange={handleOnchange} />
        <input type="password" name="password" placeholder="Password" value={loginDetails.password} onChange={handleOnchange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}


let mapDispatchToProps = (dispatch) => {
  return ({
    setCurrentUser: (userObj) => {
      dispatch(addUser(userObj))
    }
  })
}

export default connect(null, mapDispatchToProps)(Login);