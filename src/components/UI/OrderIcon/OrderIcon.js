import React from 'react';
import OrderAscending from '../../../assets/ascending.svg';
import OrderDescending from '../../../assets/descending.svg';

import classes from './OrderIcon.css';

const orderIcon = props => {
  const box = props.ascending ? (
    <img src={OrderAscending} alt="Checked" />
  ) : (
    <img src={OrderDescending} alt="Unchecked" />
  );

  return (
    <div className={classes.OrderIcon} style={{ height: props.height }}>
      {box}
    </div>
  );
};

export default orderIcon;
