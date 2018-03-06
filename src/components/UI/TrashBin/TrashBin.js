import React from 'react';
import TrashBin from '../../../assets/basket.svg';
import classes from './TrashBin.css';

const trashBin = props => (
  <div className={classes.TrashBin} style={{ height: props.height }}>
    <img src={TrashBin} alt="Delete" />
  </div>
);

export default trashBin;
