import React from 'react';
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodoName: '',
      filteredTodos: [],
      hideCompleted: false
    };
  }

  fetchTodos = () => {
    fetch(URL)
      .then(res => res.json())
      .then(todos => this.setState({ todos: todos.data }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchTodos();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ newTodoName: e.target.value })
  }

  submit = async (e) => {
    e.preventDefault();
    const todo = {
      name: this.state.newTodoName,
      completed: false
    }
    try {
      await axios.post(URL, todo)
      this.fetchTodos();
      this.setState({ newTodoName: '' });
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  }

  hideCompleted = e => {
    e.preventDefault()
    const { todos, hideCompleted} = this.state;
    this.setState({ filteredTodos: todos.filter(todo => !todo.completed), hideCompleted: !hideCompleted })
  }

  render() {
    const { todos, filteredTodos, newTodoName, hideCompleted} = this.state;

    return (
      <div>
        <TodoList todos={hideCompleted ? filteredTodos : todos} />
        <Form submit={this.submit} newTodoName={newTodoName} handleChange={this.handleChange} />
        <button onClick={this.hideCompleted}>Hide Completed</button>
      </div>
    )
  }
}
