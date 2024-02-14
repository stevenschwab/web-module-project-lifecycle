import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    const { todos, toggleTodo, hideCompleted } = this.props;
    return (
      <div id='todos'>
        <h2>Todos:</h2>
        {
          todos.reduce((acc, todo) => {
            if (!hideCompleted || !todo.completed) return acc.concat(
              <Todo 
                toggleTodo={toggleTodo} 
                key={todo.id} 
                todo={todo} 
              />
            )
            return acc
          }, [])
        }
      </div>
    )
  }
}
