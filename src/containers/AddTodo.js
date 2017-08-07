import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Button, Input } from 'semantic-ui-react';

import './AddTodo.css'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div className="AddTodo main">
      <form onSubmit={e => {
        e.preventDefault()
        const input = document.querySelector('input[name=todo]')
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <Input className="TodoText" placeholder='Task...' name='todo' />
        <Button className="TodoButton" type='submit' color='teal'>
          New Todo
        </Button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo