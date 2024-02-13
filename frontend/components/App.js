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
      error: '',
      newTodoName: '',
      filteredTodos: [],
      hideCompleted: false
    };
  }

  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.fetchTodos();
  }

  handleChange = e => {
    const { value } = e.target
    this.setState({ ...this.state, newTodoName: value });
  }

  resetForm = () => this.setState({ ...this.state, newTodoName: '' })

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message })

  postNewTodo = () => {
    axios.post(URL, { name: this.state.newTodoName })
      .then(res => {
        this.fetchTodos();
        this.resetForm();
      })
      .catch(this.setAxiosResponseError)
  }

  submit = e => {
    e.preventDefault();
    this.postNewTodo();
  }

  hideCompleted = () => {
    const { todos, hideCompleted} = this.state;
    this.setState({ ...this.state, filteredTodos: todos.filter(todo => !todo.completed), hideCompleted: !hideCompleted });
  }

  toggleTodo = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.fetchTodos();
      })
      .catch(this.setAxiosResponseError)
  }

  render() {
    const { todos, filteredTodos, newTodoName, hideCompleted, error} = this.state;

    return (
      <div>
        {error && <div id="error">Error: {error}</div>}
        <TodoList todos={hideCompleted ? filteredTodos : todos} toggleTodo={this.toggleTodo} />
        <Form submit={this.submit} newTodoName={newTodoName} handleChange={this.handleChange} />
        <button onClick={this.hideCompleted}>{hideCompleted ? 'Show' : 'Hide'} Completed</button>
      </div>
    )
  }
}
