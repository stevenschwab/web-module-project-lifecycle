import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    const { todos, toggleTodo } = this.props;
    return (
      <div id='todos'>
        <h2>Todos:</h2>
        {
          todos.map(todo => {
            return <Todo onClick={() => toggleTodo(todo.id)} key={todo.id} todo={todo} />
          })
        }
      </div>
    )
  }
}
