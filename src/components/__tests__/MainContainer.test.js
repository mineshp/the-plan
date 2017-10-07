import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Home from '../Home';
import ManageLists from '../List/Manage';
import { UpdateProjectConnectedComponent } from '../../HOC/Project/Update';
import { ManageProjectConnectedComponent } from '../../HOC/Project/ManageProject';
import ViewList from '../List/View';
import List from '../App';
import MainContainerRoutes from '../MainContainer';


describe('MainContainer Routes', () => {
    it('validates path / renders Home component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/').props().component;

        expect(attachedComponent).toBe(Home);
    });

    it('validates path /list/all renders ManageLists component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/list/all').props().component;

        expect(attachedComponent).toBe(ManageLists);
    });

    it('validates path /list/1/view renders ViewList component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/list/:id/view').props().component;

        expect(attachedComponent).toBe(ViewList);
    });

    it('validates path /list renders List component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/list').props().component;

        expect(attachedComponent).toBe(List);
    });

    it('validates path /project/all renders ManageProject component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/project/all').props().component;

        expect(attachedComponent).toBe(ManageProjectConnectedComponent);
    });

    it('validates path /project/update renders UpdateProjectConnectedComponent component for create', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/project/update').props().component;

        expect(attachedComponent).toBe(UpdateProjectConnectedComponent);
    });

    it('validates path /project/update/:id renders UpdateProjectConnectedComponent component for update', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/project/update/:id').props().component;

        expect(attachedComponent).toBe(UpdateProjectConnectedComponent);
    });

    it('Validates all routes', () => {
        const component = shallow(<MainContainerRoutes />);

        expect(component).toMatchSnapshot();
    });

    xit('returns message if no match found for route', () => {
        const tree = shallow(<MainContainerRoutes />);

        const NoMatchRoute = tree.find(Route).last();
        console.log(NoMatchRoute.props().component);
        // expect(NoMatchRoute.props().component).toBe(NoMatchFunc);
        // expect(NoMatchRoute.contains(<div>No match for</div>)).toBe(true)
    });
});
