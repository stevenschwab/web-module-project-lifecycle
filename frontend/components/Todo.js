import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { toggleTodo, todo } = this.props;
    const { id, name, completed } = todo;
    return (
      <div onClick={() => toggleTodo(id)}>
        {name} {completed ? '✓' : ''}
      </div>
    )
  }
}
