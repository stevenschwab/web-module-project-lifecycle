import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.submit}>
        <input value={this.props.newTodoName} onChange={this.props.handleChange} type='text' placeholder='Type todo' />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
