import React from 'react';
import TrashBin from '../../UI/TrashBin/TrashBin';
import CheckBox from '../../UI/CheckBox/CheckBox';
import classes from './TableBodyRow.css';

const tableBodyRow = props => {
  const trashBin = props.showTrashBin ? (
    <div
      className={classes.TrashBin}
      onClick={() => props.deleteTask(props.toDo.taskId)}>
      <TrashBin height="100%" />
    </div>
  ) : null;
  
  const getPriority = () => {
    switch (props.toDo.priority) {
      case "1":
      return "Low";
      case "2":
      return "Medium";
      case "3":
      return "High";
      default:
      return ""
    }
  }

  return (
    <tr
      className={classes.TableRow}
      onMouseEnter={() => props.hoverTask(props.toDo.taskId)}
      onMouseLeave={() => props.hoverTask('')}>
      <td>
        <div className={classes.Cell}>{props.toDo.taskName}</div>
      </td>
      <td>
        <div className={classes.Cell}>{getPriority()}</div>
      </td>
      <td>
        <div className={classes.Cell}>
          <div className={classes.CheckBox}>
            <CheckBox
              checked={props.toDo.done}
              clicked={() => props.checkTask(props.toDo.taskId)}
            />
          </div>

          {trashBin}
        </div>
      </td>
    </tr>
  );
};

export default tableBodyRow;
