import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <div>
        <h2>Todos:</h2>
        {todos.map(todo => <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>)}
      </div>
    )
  }
}
