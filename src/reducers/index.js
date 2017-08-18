import { combineReducers } from 'redux'
import todos from './todos'
import projects from './projects'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  projects,
  visibilityFilter
})

export default todoApp