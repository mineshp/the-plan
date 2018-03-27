import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from './App';

import { ControlCentreConnectedComponent } from '../HOC/Admin/ControlCentre';
import { RegisterConnectedComponent } from '../HOC/Authentication/Register';
import { LoginConnectedComponent } from '../HOC/Authentication/Login';
import { ManageListSummaryConnectedComponent } from '../HOC/ListsSummary/ManageListSummary';
import { ManageListConnectedComponent } from '../HOC/List/ManageList';
import { UpdateListConnectedComponent } from '../HOC/List/Update';
import { ManageProjectConnectedComponent } from '../HOC/Project/ManageProject';
import { UpdateProjectConnectedComponent } from '../HOC/Project/Update';
import NotFound from './Shared/NotFound';
import Home from './Home';
import requireAuth from '../utils/requireAuth';

// For more info see
// https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

const Main = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/admin/manage" component={ControlCentreConnectedComponent} />
        <Route path="/user/register" component={RegisterConnectedComponent} />
        <Route path="/user/login" component={LoginConnectedComponent} />
        <Route path="/list/all" component={requireAuth(ManageListSummaryConnectedComponent)} />
        <Route path="/list/view/:id" component={requireAuth(ManageListConnectedComponent)} />
        <Route path="/list/update/:id" component={requireAuth(UpdateListConnectedComponent)} />
        <Route path="/list/update" component={requireAuth(UpdateListConnectedComponent)} />
        <Route path="/list" component={requireAuth(List)} />
        <Route path="/project/all" component={requireAuth(ManageProjectConnectedComponent)} />
        <Route path="/project/update/:id" component={requireAuth(UpdateProjectConnectedComponent)} />
        <Route path="/project/update" component={requireAuth(UpdateProjectConnectedComponent)} />
        <Route path="/project/:projectName/lists" component={requireAuth(ManageListSummaryConnectedComponent)} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Main;
