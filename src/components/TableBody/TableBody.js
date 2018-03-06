import React from 'react';
import TableBodyRow from './TableBodyRow/TableBodyRow';
import classes from './TableBody.css';

const tableBody = props => {
  let toDoRows;
  if (props.toDos.length > 0) {
    toDoRows = props.toDos.map(toDo => {
      return (
        <TableBodyRow
          key={toDo.taskId}
          toDo={toDo}
          showTrashBin={toDo.taskId === props.showTrashBinAt}
          hoverTask={props.hoverTask}
          deleteTask={props.deleteTask}
          checkTask={props.checkTask}
        />
      );
    });
  } else {
    toDoRows = null 
  }

  const emptyRows = () => {
    const emptyRowsList = [];
    let oneRow ;

    for(let i = 0; i < (props.rowsPerPage - props.toDos.length) ; i++) {
       oneRow = (
        <tr key={i}>
          <td 
            colSpan="3">
            <div style={{height: "85px"}}></div>
          </td>
        </tr>
      );
      emptyRowsList.push(oneRow);
    }

    return emptyRowsList;
  }

  return <tbody className={classes.TableBody}>{toDoRows}{emptyRows()}</tbody>;
};

export default tableBody;
