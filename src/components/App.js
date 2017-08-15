import React from 'react'
import Footer from './Footer'
import AddTodo from '../HOC/AddTodo'
import VisibleTodoList from '../HOC/VisibleTodoList'
import { Container } from 'semantic-ui-react';

const App = () => (
  <Container>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Container>
)

export default App