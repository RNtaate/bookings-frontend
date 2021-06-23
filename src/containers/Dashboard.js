import React from 'react';
import { connect } from 'react-redux';

let Dashboard = (props) => {
  return (
    <h2>Welcome {props.myUserObj.user.username}</h2>
  )
}

let mapStateToProps = (state) => {
  return ({
    myUserObj: state.userReducer
  })
}

export default connect(mapStateToProps, null)(Dashboard);