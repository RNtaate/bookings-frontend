import React from 'react'
import { Link } from 'react-router-dom';

let  MassageCard = (props) => {

  let {massageObj: massage} = props;

  return (
    <div>
      <Link to={`/massage/${massage.id}`}>
        <h2>{massage.name}</h2>
        <img src={massage.massage_image.url}/>
      </Link>
    </div>
  )
}

export default MassageCard
