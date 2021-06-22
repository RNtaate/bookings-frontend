import React, { useState } from 'react';

let Login = () =>{

  let [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  })

  let handleOnchange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value});
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    setLoginDetails({
      username: '',
      password: ''
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={loginDetails.username} onChange={handleOnchange} />
        <input type="password" name="password" placeholder="Password" value={loginDetails.password} onChange={handleOnchange} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;