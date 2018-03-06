import React from 'react';
import TableBodyRow from './TableBodyRow/TableBodyRow';
import classes from './TableBody.css';

const tableBody = props => {
  let toDoRows
  if (props.toDos) {
    toDoRows = props.toDos.map(toDo =>   {
      return <TableBodyRow 
                key={toDo.taskId} 
                toDo={toDo} 
                showTrashBin={toDo.taskId===props.showTrashBinAt}
                hoverTask={props.hoverTask}
                deleteTask={props.deleteTask}/>;
    });
  } else {
    toDoRows = (
      <tr>
        <td>Add some task</td>
      </tr>
    )
  }
  

  return <tbody className={classes.TableBody}>{toDoRows}</tbody>;
};

export default tableBody;
