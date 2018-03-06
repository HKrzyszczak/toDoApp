import React from 'react';
import classes from './TableBodyRow.css';

const tableBodyRow = props => {
  const trashBin = (
    props.showTrashBin ? <span onClick={() => props.deleteTask(props.toDo.taskId)}>kosz</span> : null
  );

  return (
    <tr
      className={classes.TableRow}
      onMouseEnter={() => props.hoverTask(props.toDo.taskId)}
      onMouseLeave={() => props.hoverTask('')}>
      <td className={classes.Cell}>{props.toDo.taskName}</td>
      <td className={classes.Cell}>{props.toDo.priority}</td>
      <td className={null}>
        <span>
          <input type="checkbox" value={props.toDo.done} />
        </span>
        {trashBin}
      </td>
    </tr>
  );
};

export default tableBodyRow;
