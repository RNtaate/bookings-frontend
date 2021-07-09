import React from 'react'
import * as styles from './stylesheets/Sidebar.module.css';
import { connect } from 'react-redux';

function Sidebar(props) {

  const {myUserObj} = props;

  return (
    <div className={styles.sidebar_div}>
      <h2>Norp Massage Parlor</h2>
      <h3>Hi, {myUserObj.user.username}</h3>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

export default connect(mapStateToProps, null)(Sidebar);
