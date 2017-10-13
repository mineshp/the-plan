import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './App';
// import ManageLists from './List/Manage';
import { ManageListSummaryConnectedComponent } from '../HOC/ListsSummary/ManageListSummary';
import { ManageListConnectedComponent } from '../HOC/List/ManageList';
import { ManageProjectConnectedComponent } from '../HOC/Project/ManageProject';
import { UpdateProjectConnectedComponent } from '../HOC/Project/Update';
import Home from './Home';

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list/all" component={ManageListSummaryConnectedComponent} />
        <Route path="/list/view/:id" component={ManageListConnectedComponent} />
        <Route path="/list" component={List} />
        <Route path="/project/all" component={ManageProjectConnectedComponent} />
        <Route path="/project/update/:id" component={UpdateProjectConnectedComponent} />
        <Route path="/project/update" component={UpdateProjectConnectedComponent} />
    </Switch>
);

export default Main;
