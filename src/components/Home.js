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
      <Registration showRegForm={showRegForm} toggleShowRegForm={toggleShowRegForm}/>
    </div>
  )
}

export default Home;