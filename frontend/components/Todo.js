import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { todo, toggleTodo } = this.props;
    const { id, name, completed } = todo;
    return (
      <div 
        id='todo-item' 
        onClick={toggleTodo(id)}
      >
        {name}{completed ? ' ✓' : ''}
      </div>
    )
  }
}
