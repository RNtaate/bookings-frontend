import React from 'react';

let Registration = () => {
  return (
    <div>
      <form>
        <input type="text" name="username" placeholder="Username"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="password_confirmation" placeholder="Password Confirmation"/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Registration;