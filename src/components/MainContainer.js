import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './App';
// import ManageLists from './List/Manage';
import { RegisterConnectedComponent } from '../HOC/Authentication/Register';
import { LoginConnectedComponent } from '../HOC/Authentication/Login';
import { ManageListSummaryConnectedComponent } from '../HOC/ListsSummary/ManageListSummary';
import { ManageListConnectedComponent } from '../HOC/List/ManageList';
import { UpdateListConnectedComponent } from '../HOC/List/Update';
import { ManageProjectConnectedComponent } from '../HOC/Project/ManageProject';
import { UpdateProjectConnectedComponent } from '../HOC/Project/Update';
import NotFound from './Shared/NotFound';
import Home from './Home';

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user/register" component={RegisterConnectedComponent} />
        <Route path="/user/login" component={LoginConnectedComponent} />
        <Route path="/list/all" component={ManageListSummaryConnectedComponent} />
        <Route path="/list/view/:id" component={ManageListConnectedComponent} />
        <Route path="/list/update/:id" component={UpdateListConnectedComponent} />
        <Route path="/list/update" component={UpdateListConnectedComponent} />
        <Route path="/list" component={List} />
        <Route path="/project/all" component={ManageProjectConnectedComponent} />
        <Route path="/project/update/:id" component={UpdateProjectConnectedComponent} />
        <Route path="/project/update" component={UpdateProjectConnectedComponent} />
        <Route path="/project/:projectName/lists" component={ManageListSummaryConnectedComponent} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Main;
