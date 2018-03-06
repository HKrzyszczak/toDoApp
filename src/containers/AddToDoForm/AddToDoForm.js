import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Button from '../../components/UI/Button/Button';
import classes from './AddToDoForm.css';

class AddToDoForm extends Component {
  state = {
    toDo: {
      taskId: '',
      taskName: '',
      priority: '3',
      done: false
    }
  };

  changePriorityHandler = event => {
    const changedToDo = { ...this.state.toDo };
    changedToDo.priority = event.target.value;
    this.setState({ toDo: changedToDo });
  };

  changeNameHandler = event => {
    const changedToDo = { ...this.state.toDo };
    changedToDo.taskName = event.target.value;
    this.setState({ toDo: changedToDo });
  };

  saveTask = () => {
    this.props.add(this.state.toDo);
    const changedToDo = { ...this.state.toDo };
    changedToDo.taskName = '';
    changedToDo.priority = "3";
    this.setState({ toDo: changedToDo });
  };

  keyPressHandler = event => {
    if (event.key === 'Enter' && this.state.toDo.taskName) {
      this.saveTask();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.props.cancel();
      event.preventDefault();
    }
  };

  focus = () => {
    this.textInput.focus();
  }

  render() {
    return (
      <Aux>
        <div className={classes.Content}>
          <h4>Name</h4>
          <div>
            <input
              type="text"
              onChange={this.changeNameHandler}
              onKeyPress={this.keyPressHandler}
              value={this.state.toDo.taskName}
              autoFocus
            />
          </div>
          <h4>Priority</h4>
          <div>
            <select onChange={this.changePriorityHandler} defaultValue="3">
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div>
            <Button
              btnType="Success"
              clicked={this.saveTask}
              disabled={!this.state.toDo.taskName}>
              Add task
            </Button>
            <Button btnType="Danger" clicked={this.props.cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Aux>
    );
  }
}

export default AddToDoForm;
