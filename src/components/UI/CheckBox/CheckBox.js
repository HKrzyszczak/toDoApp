import React from 'react';
import CheckedPic from '../../../assets/checked.svg';
import UncheckedPic from '../../../assets/unchecked.svg';

import classes from './CheckBox.css';

const checkBox = props => {
  const box = props.checked ? (
    <img src={CheckedPic} alt="Checked" />
  ) : (
    <img src={UncheckedPic} alt="Unchecked" />
  );

  return (
    <div
      className={classes.TrashBin}
      style={{ height: props.height }}
      onClick={props.clicked}>
      {box}
    </div>
  );
};

export default checkBox;
