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
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message})
      })
  }

  componentDidMount() {
    this.fetchTodos();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ newTodoName: e.target.value });
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

  hideCompleted = () => {
    const { todos, hideCompleted} = this.state;
    this.setState({ filteredTodos: todos.filter(todo => !todo.completed), hideCompleted: !hideCompleted });
  }

  toggleTodo = async (id) => {
    try {
      await axios.patch(`${URL}/${id}`);
      this.fetchTodos();
    } catch (error) {
      console.log('Error toggling todos:', error)
    }
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
