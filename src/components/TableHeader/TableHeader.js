import React from 'react';
import Button from '../UI/Button/Button';
import OrderIcon from '../UI/OrderIcon/OrderIcon';
import classes from './TableHeader.css';

const tableHeader = props => {
  const orderIcon = <OrderIcon ascending={props.orderAscending} />;

  return (
    <thead>
      <tr className={classes.HeaderRow}>
        <td 
          className={classes.HeaderTd}
          onClick={() => props.sorting('taskName')} 
          style={{ width: '60%' }}>
          <div className={classes.HeaderCell}>
            Task name
            <div>
              <Button btnType="Action" clicked={props.clicked}>
                Add task
              </Button>
            </div>
            {props.sortedColumn === "taskName" ? orderIcon : <div style={{width: "24px"}}></div>}
          </div>
        </td>
        <td 
          className={classes.HeaderTd}
          onClick={() => props.sorting('priority')} 
          style={{ width: '20%' }}>
          <div className={classes.HeaderCell}>
            Priority
            {props.sortedColumn === "priority" ? orderIcon : null}
          </div>
        </td>
        <td 
          className={classes.HeaderTd}
          onClick={() => props.sorting('done')} 
          style={{ width: '20%' }}>
          <div className={classes.HeaderCell} style={{ width: '50%' }}>
            Done
            {props.sortedColumn === "done" ? orderIcon : null}
          </div>
        </td>
      </tr>
    </thead>
  );
};

export default tableHeader;
