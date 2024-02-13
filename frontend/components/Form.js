import React from 'react'

export default class Form extends React.Component {
  render() {
    const { submit, newTodoName, handleChange } = this.props;
    return (
      <form id='todoForm' onSubmit={submit}>
        <input value={newTodoName} onChange={handleChange} type='text' placeholder='Type todo' />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
