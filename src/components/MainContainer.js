import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './App';
// import ManageLists from './List/Manage';
import { ManageListConnectedComponent } from '../HOC/List/ManageList';
import { ManageProjectConnectedComponent } from '../HOC/Project/ManageProject';
import { UpdateProjectConnectedComponent } from '../HOC/Project/Update';

import ViewList from './List/View';
import Home from './Home';

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list/all" component={ManageListConnectedComponent} />
        <Route path="/list/:id/view" component={ViewList} />
        <Route path="/list" component={List} />
        <Route path="/project/all" component={ManageProjectConnectedComponent} />
        <Route path="/project/update/:id" component={UpdateProjectConnectedComponent} />
        <Route path="/project/update" component={UpdateProjectConnectedComponent} />
    </Switch>
);

export default Main;
