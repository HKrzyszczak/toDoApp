import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import ToDoTable from './containers/ToDoTable/ToDoTable'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <ToDoTable />          
        </Layout>       
      </div>
    );
  }
}

export default App;
