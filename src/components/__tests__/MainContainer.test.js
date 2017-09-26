import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Home from '../Home';
import ManageLists from '../List/Manage';
import { CreateProjectConnectedComponent } from '../../HOC/Project/Create';
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

    it('validates path /project/create renders CreateProjectConnectedComponent component', () => {
        const tree = shallow(<MainContainerRoutes />);
        const attachedComponent =
            tree.findWhere((n) => n.prop('path') === '/project/create').props().component;

        expect(attachedComponent).toBe(CreateProjectConnectedComponent);
    });

    it('Validate routes', () => {
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
