import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableBody from '../../components/TableBody/TableBody';
import TableFooter from '../../components/TableFooter/TableFooter';
import Aux from '../../hoc/ReactAux/ReactAux';
import classes from './ToDoTable.css';

class ToDoTable extends Component {
  state = {
    toDos: [],
    rowsPerPage: 5,
    currentPage: 1,
    sortedColumn: '',
    orderAscending: false,
    actTaskId: ''
  };

  componentWillMount() {
    const toDos = JSON.parse(localStorage.getItem('toDos'));
    let rowsPerPage = parseInt(localStorage.getItem('rowsPerPage'), 10);
    if (rowsPerPage <= 0) {
      rowsPerPage = 5;
    }
    this.setState({
      toDos: toDos,
      rowsPerPage: rowsPerPage
    });
  }

  saveToDosToLocalStorage = () => {
    localStorage.setItem('toDos', JSON.stringify(this.state.toDos));
  };

  handleChoseRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      currentPage: 1
    });
    localStorage.setItem('rowsPerPage', event.target.value);
  };

  handleChangePage = increse => {
    const maxPages = Math.ceil(
      this.state.toDos.length / this.state.rowsPerPage
    );
    if (increse && this.state.currentPage < maxPages) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    } else if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleMouseHover = (taskId) => {
    this.setState({actTaskId: taskId});
  }

  handleSort = sortedColumn => {
    console.log(sortedColumn);
    const sortedToDos = [...this.state.toDos];
    if (this.state.sortedColumn === sortedColumn) {
      if (this.state.orderAscending) {
        sortedToDos.sort((a, b) => a[sortedColumn] === b[sortedColumn] ? 0 : (a[sortedColumn]  > b[sortedColumn]) || -1);      
      } else {
        sortedToDos.sort((b, a) => a[sortedColumn] === b[sortedColumn] ? 0 : (a[sortedColumn] > b[sortedColumn]) || -1);
        
      }
      this.setState({ orderAscending: !this.state.orderAscending });
    } else {
      sortedToDos.sort((b, a) => a[sortedColumn] === b[sortedColumn] ? 0 : (a[sortedColumn] > b[sortedColumn]) || -1);
      this.setState({
        orderAscending: true,
        sortedColumn: sortedColumn
      });
    }
    this.setState({ toDos: sortedToDos });
  };

  handleDeleteTask = (taskId) => {
    const changedToDos = this.state.toDos.filter(toDo => toDo.taskId !== taskId);
    console.log('delete task:', taskId);
    this.setState({toDos: changedToDos}, this.saveToDosToLocalStorage);
  }

  handleAddTask = (toDo) => {
    const changedToDos = [...this.state.toDos];
    changedToDos.push(toDo);
    this.setState({toDos: changedToDos}, this.saveToDosToLocalStorage);
  }

  getFirstRow = () => (this.state.currentPage - 1) * this.state.rowsPerPage ;

  getLastRow = () => this.state.currentPage * this.state.rowsPerPage;

  getStatus = () => {
    const rowsCount = this.state.toDos.length;
    let firstRow = this.getFirstRow() + 1;
    let lastRow = this.getLastRow(); 
    lastRow = lastRow > rowsCount ? rowsCount : lastRow;
    let status = firstRow + ' - ' + lastRow + ' of ' + this.state.toDos.length;
    return status;
  };

  getPageOffTodos = () => {
    const toDosPage = this.state.toDos.slice(this.getFirstRow(), this.getLastRow());

    return toDosPage;
  }

  render() {
    const status = this.getStatus();
    const toDos = this.getPageOffTodos();

    return (
      <Aux>
        <div className={classes.TableContainer}>
          <table className={classes.ToDoTable}>
            <TableHeader 
              sorting={this.handleSort}/>
            <TableBody 
              toDos={toDos} 
              showTrashBinAt={this.state.actTaskId}
              hoverTask={this.handleMouseHover}
              deleteTask={this.handleDeleteTask}
              />
            <TableFooter
              chosePagination={this.handleChoseRowsPerPage}
              changePage={this.handleChangePage}
              rowsPerPage={this.state.rowsPerPage}
              status={status}
            />
          </table>
        </div>
      </Aux>
    );
  }
}

export default ToDoTable;
