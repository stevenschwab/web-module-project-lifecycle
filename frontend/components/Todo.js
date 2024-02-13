import React from 'react';

export default class Todo extends React.Component {
  render() {
    const { todo, onClick } = this.props;
    const { name, completed } = todo;
    return (
      <div onClick={onClick}>
        {name}{completed ? ' ✓' : ''}
      </div>
    )
  }
}
