import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as styles from './stylesheets/MassageCard.module.css';

const MassageCard = (props) => {
  const { massageObj: massage } = props;

  return (
    <div className={styles.massageCard_div}>
      <Link to={`/massage/${massage.id}`}>
        <div className={styles.massageCard_inner_div}>
          <div className={styles.massageCard_poster_div} style={{ backgroundImage: `url(${massage.massage_image.url})` }} />
          <h2>{massage.name}</h2>
        </div>
      </Link>
    </div>
  );
};

MassageCard.propTypes = {
  massageObj: PropTypes.instanceOf(Object).isRequired,
};

export default MassageCard;
