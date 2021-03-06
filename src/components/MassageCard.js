import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as styles from './stylesheets/MassageCard.module.css';

const MassageCard = (props) => {
  const { massageObj: massage } = props;

  return (
    <div className={styles.massageCard_div}>
      <Link to={`/massage/${massage.id}`} className={styles.massageCard_link}>
        <div className={styles.massageCard_inner_div}>
          <div className={styles.massageCard_poster_div}>
            <img src={massage.massage_image.url} alt="" />
          </div>
          <div className={styles.massageCard_caption_div}>
            <h2>{massage.name}</h2>
            <div className={styles.seperator_div} />
            <p>{massage.description}</p>
            <div className={styles.massageCard_icons_div}>
              <span><i className="fab fa-facebook-f" /></span>
              <span><i className="fab fa-twitter" /></span>
              <span><i className="fab fa-pinterest-p" /></span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

MassageCard.propTypes = {
  massageObj: PropTypes.instanceOf(Object).isRequired,
};

export default MassageCard;
