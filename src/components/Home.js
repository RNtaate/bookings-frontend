import React, {useState} from 'react';
import Registration from './auth/Registration';

let Home = () => {

  let [showRegForm, setShowRegForm] = useState(false);

  let toggleShowRegForm = () => {
    setShowRegForm(!showRegForm);
  }

  return (
    <div className="home_div">
      <h1>This is the home component</h1>
      <button onClick={toggleShowRegForm}>Sign up</button>
      <div>
        {
          showRegForm == true ? 
          <Registration showRegForm={showRegForm} toggleShowRegForm={toggleShowRegForm}/> : null
        }
      </div>
    </div>
  )
}

export default Home;