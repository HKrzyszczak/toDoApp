import React, { Component } from 'react';
import TableHeader from '../../components/TableHeader/TableHeader';
import TableBody from '../../components/TableBody/TableBody';
import TableFooter from '../../components/TableFooter/TableFooter';

class ToDoTable extends Component {
  state = {
    toDos: [
      {}
    ]
  }

  render () {
    return (
      <table>
        <TableHeader />
        <TableBody />
        <TableFooter />        
      </table>
    );
  }
}

export default ToDoTable;