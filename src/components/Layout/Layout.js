import React from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import ToDoTable from '../../containers/ToDoTable/ToDoTable';
import classes from './Layout.css';

const Layout = props => (
  <Aux>
    <div>Toolbarrr</div>
    <ToDoTable />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
