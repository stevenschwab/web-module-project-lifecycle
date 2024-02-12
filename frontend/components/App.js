import React from 'react';
import TodoList from './TodoList';
import Form from './Form';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodoName: ''
    };
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(todos => this.setState({ todos: todos.data }))
      .catch(err => console.log(err))
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ newTodoName: e.target.value })
  }

  submit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <TodoList todos={this.state.todos} />
        <Form submit={this.submit} newTodoName={this.state.newTodoName} handleChange={this.handleChange} />
        <button>Hide Completed</button>
      </div>
    )
  }
}
