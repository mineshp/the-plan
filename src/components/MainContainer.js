import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { Router } from 'react-router'
import List from './App.js';
import ManageLists from './List/Manage.js';
import ManageProjects from './Project/Manage.js';
import CreateProject from '../HOC/Project/Create.js';

import ViewList from './List/View.js';
import Home from './Home'
// import Roster from './Roster'
// import Schedule from './Schedule'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
);


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/list/all' component={ManageLists} />
      <Route path='/list/:id/view' component={ViewList} />
      <Route path='/list' component={List} />
      <Route path='/project/all' component={ManageProjects} />
      <Route path='/project/create' component={CreateProject} />
      <Route component={NoMatch}/>
      </Switch>
  </main>
)

export default Main