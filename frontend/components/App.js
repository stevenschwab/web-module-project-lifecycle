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
    const { newTodoName, todos } = this.state;
    axios.post(URL, { name: newTodoName })
      .then(res => {
        this.setState({ ...this.state, todos: todos.concat(res.data.data) })
        this.resetForm();
      })
      .catch(this.setAxiosResponseError)
  }

  submit = e => {
    e.preventDefault();
    this.postNewTodo();
  }

  toggleCompleted = () => {
    this.setState({ ...this.state, hideCompleted: !this.state.hideCompleted });
  }

  toggleTodo = id => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
          if (todo.id !== id) return todo;
          return res.data.data;
        }) })
      })
      .catch(this.setAxiosResponseError)
  }

  render() {
    const { todos, newTodoName, hideCompleted, error} = this.state;
    return (
      <div>
        {error && <div id="error">Error: {error}</div>}
        <TodoList 
          hideCompleted={hideCompleted} 
          todos={todos} 
          toggleTodo={this.toggleTodo} 
        />
        <Form 
          toggleCompleted={this.toggleCompleted} 
          submit={this.submit} 
          newTodoName={newTodoName} 
          handleChange={this.handleChange} 
          hideCompleted={hideCompleted}
        />
      </div>
    )
  }
}
