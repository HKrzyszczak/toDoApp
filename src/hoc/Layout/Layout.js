import React from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import classes from './Layout.css';

const Layout = props => (
  <Aux>    
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
