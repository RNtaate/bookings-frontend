import React from 'react';
import Registration from './auth/Registration';

let Home = () => {
  return (
    <div className="home_div">
      <h1>This is the home component</h1>
      <div className="reg_form_div">
        <Registration />
      </div>
    </div>
  )
}

export default Home;