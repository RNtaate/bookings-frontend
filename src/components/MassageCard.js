import React from 'react'
import { Link } from 'react-router-dom';

import * as styles from './stylesheets/MassageCard.module.css';

let  MassageCard = (props) => {

  let {massageObj: massage} = props;

  return (
    <div className={styles.massageCard_div}>
      <Link to={`/massage/${massage.id}`}>
        <div className={styles.massageCard_inner_div}>
          {/* <img src={massage.massage_image.url}/> */}
          <div className={styles.massageCard_poster_div} style={{backgroundImage: `url(${massage.massage_image.url})`}}>
          </div>
          <h2>{massage.name}</h2>
        </div>
      </Link>
    </div>
  )
}

export default MassageCard
