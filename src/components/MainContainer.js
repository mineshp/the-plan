import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './App';
import ManageLists from './List/Manage';
import { ManageProjectConnectedComponent } from '../HOC/Project/ManageProject';
import { CreateProjectConnectedComponent } from '../HOC/Project/Create';

import ViewList from './List/View';
import Home from './Home';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list/all" component={ManageLists} />
        <Route path="/list/:id/view" component={ViewList} />
        <Route path="/list" component={List} />
        <Route path="/project/all" component={ManageProjectConnectedComponent} />
        <Route path="/project/create" component={CreateProjectConnectedComponent} />
    </Switch>
);

export default Main;
