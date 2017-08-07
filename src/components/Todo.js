import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, List } from 'semantic-ui-react';

const Todo = ({ onClick, completed, text }) => (
  <List.Item>
    <Checkbox onClick={onClick} checked={completed} label={(
      <label style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
      </label>
    )}/>
  </List.Item>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo