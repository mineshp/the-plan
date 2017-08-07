import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Container } from 'semantic-ui-react';

const App = () => (
  <Container>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Container>
)

export default App