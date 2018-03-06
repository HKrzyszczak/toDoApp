import React from 'react';
import classes from './TableHeader.css';

const tableHeader = (props) => (
  <thead>
    <tr className={classes.HeaderRow}>
      <td 
        onClick={() => props.sorting('taskName')} 
        className={classes.HeaderCell}>Task name</td>
      <td
        onClick={() => props.sorting('priority')}
        className={classes.HeaderCell}>Priority</td>
      <td
      onClick={() => props.sorting('done')}
      className={classes.HeaderCell}>Done</td>
    </tr>
  </thead>
);

export default tableHeader;
