import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableBody from '../../components/TableBody/TableBody';
import TableFooter from '../../components/TableFooter/TableFooter';
import Aux from '../../hoc/ReactAux/ReactAux';
import Modal from '../../components/UI/Modal/Modal';
import AddToDoForm from '../AddToDoForm/AddToDoForm';
import classes from './ToDoTable.css';

class ToDoTable extends Component {
  state = {
    toDos: [],
    rowsPerPage: 5,
    currentPage: 1,
    sortedColumn: '',
    orderAscending: false,
    actTaskId: '',
    addingTask: false
  };

  componentWillMount() {
    const toDos = JSON.parse(localStorage.getItem('toDos'));
    const toDosToState = toDos ? toDos : [];
    let rowsPerPage = parseInt(localStorage.getItem('rowsPerPage'), 10);
    if (!rowsPerPage) {
      rowsPerPage = 5;
    }
    this.setState({
      toDos: toDosToState,
      rowsPerPage: rowsPerPage
    });
  }

  saveToDosToLocalStorage = () => {
    localStorage.setItem('toDos', JSON.stringify(this.state.toDos));
    this.sortColumn();
  };

  choseRowsPerPageHandler = event => {
    this.setState({
      rowsPerPage: event.target.value,
      currentPage: 1
    });
    localStorage.setItem('rowsPerPage', event.target.value);
  };

  changePageHandler = increse => {
    const maxPages = Math.ceil(
      this.state.toDos.length / this.state.rowsPerPage
    );
    if (increse) {
      if (this.state.currentPage < maxPages) {
        this.setState({ currentPage: this.state.currentPage + 1 });
      }
    } else if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  mouseHoverHandler = taskId => {
    this.setState({ actTaskId: taskId });
  };

  sortColumn = () => {
    const sortedToDos = [...this.state.toDos];
    const sortedColumn = this.state.sortedColumn;
    const ascending = this.state.orderAscending;

    if (sortedColumn === '') {
      return;
    }
    if (ascending) {
      sortedToDos.sort((a, b) => {
        let valueA =
          typeof a[sortedColumn] === 'boolean' || typeof a[sortedColumn] === 'number'
            ? a[sortedColumn]
            : a[sortedColumn].toUpperCase();
        let valueB =
          typeof b[sortedColumn] === 'boolean' || typeof b[sortedColumn] === 'number'
            ? b[sortedColumn]
            : b[sortedColumn].toUpperCase();
        return valueA === valueB ? 0 : valueA > valueB || -1;
      });
    } else {
      sortedToDos.sort((b, a) => {
        let valueA = typeof (a[sortedColumn] === 'boolean'  || typeof a[sortedColumn] === 'number')
          ? a[sortedColumn]
          : a[sortedColumn].toUpperCase();
        let valueB = typeof (b[sortedColumn] === 'boolean'  || typeof b[sortedColumn] === 'number')
          ? b[sortedColumn]
          : b[sortedColumn].toUpperCase();
        return valueA === valueB ? 0 : valueA > valueB || -1;
      });
    }
    this.setState({ toDos: sortedToDos });
  };

  sortHandler = sortedColumn => {
    if (this.state.sortedColumn === sortedColumn) {
      this.setState(
        {
          orderAscending: !this.state.orderAscending
        },
        this.sortColumn
      );
    } else {
      this.setState(
        {
          orderAscending: true,
          sortedColumn: sortedColumn
        },
        this.sortColumn
      );
    }
  };

  deleteTaskHandler = taskId => {
    const changedToDos = this.state.toDos.filter(
      toDo => toDo.taskId !== taskId
    );
    this.setState({ toDos: changedToDos }, this.saveToDosToLocalStorage);
  };

  cancelAddHandler = () => {
    this.setState({ addingTask: false });
  };

  showAddTaskHandler = () => {
    this.setState({ addingTask: true });
  };

  addTaskHandler = toDo => {
    const changedToDos = [...this.state.toDos];
    const changedTodo = { ...toDo };
    changedTodo.taskId = (
      Date.now().toString(36) +
      Math.random()
        .toString(36)
        .substr(2, 5)
    ).toUpperCase();
    changedToDos.push(changedTodo);
    this.setState(
      {
        toDos: changedToDos,
        addingTask: false
      },
      this.saveToDosToLocalStorage
    );
  };

  checkDoneHandler = taskId => {
    const changedToDos = [...this.state.toDos];
    const toDo = changedToDos.find(task => task.taskId === taskId);
    toDo.done = !toDo.done;
    this.setState({ toDos: changedToDos }, this.saveToDosToLocalStorage);
  };

  getFirstRow = () => (this.state.currentPage - 1) * this.state.rowsPerPage;

  getLastRow = () => this.state.currentPage * this.state.rowsPerPage;

  getStatus = () => {
    const rowsCount = this.state.toDos.length;
    let firstRow = this.getFirstRow() + 1;
    let lastRow = this.getLastRow();
    lastRow = lastRow > rowsCount ? rowsCount : lastRow;
    firstRow = lastRow === 0 ? 0 : firstRow;
    let status = firstRow + ' - ' + lastRow + ' of ' + this.state.toDos.length;
    return status;
  };

  getPageOffTodos = () => {
    const toDosPage = this.state.toDos.slice(
      this.getFirstRow(),
      this.getLastRow()
    );
    return toDosPage;
  };

  getToDoTable = () => {
    const status = this.getStatus();
    const toDos = this.getPageOffTodos();

    return (
      <div className={classes.TableContainer}>
        <table className={classes.ToDoTable}>
          <TableHeader
            sorting={this.sortHandler}
            clicked={this.showAddTaskHandler}
            orderAscending={this.state.orderAscending}
            sortedColumn={this.state.sortedColumn}
          />
          <TableBody
            toDos={toDos}
            showTrashBinAt={this.state.actTaskId}
            hoverTask={this.mouseHoverHandler}
            deleteTask={this.deleteTaskHandler}
            checkTask={this.checkDoneHandler}
            rowsPerPage={this.state.rowsPerPage}
          />
          <TableFooter
            chosePagination={this.choseRowsPerPageHandler}
            changePage={this.changePageHandler}
            rowsPerPage={this.state.rowsPerPage}
            status={status}
          />
        </table>
      </div>
    );
  };

  render() {
    const toDoTable = this.getToDoTable();

    return (
      <Aux>
        <Modal show={this.state.addingTask} modalClosed={this.cancelAddHandler}>
          <AddToDoForm
            add={this.addTaskHandler}
            cancel={this.cancelAddHandler}
          />
        </Modal>
        {toDoTable}
      </Aux>
    );
  }
}

export default ToDoTable;
