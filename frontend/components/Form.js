import React from 'react'

export default class Form extends React.Component {
  render() {
    const { submit, newTodoName, handleChange, toggleCompleted, hideCompleted } = this.props;
    return (
      <>
        <form id='todoForm' onSubmit={submit}>
          <input 
            value={newTodoName} 
            onChange={handleChange} 
            type='text' 
            placeholder='Type todo' />
          <input type='submit'></input>
        </form>
        <button 
          onClick={toggleCompleted}
        >
          {hideCompleted ? 'Show' : 'Hide'} Completed
        </button>
      </>
    )
  }
}
