import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import MainNav from '../MainNav';

describe('MainNav Component', () => {
    const props = {
        username: 'testUser'
    };

    it('renders navigation component with Hola user when user is logged in', () => {
        const tree = renderer.create(<MainNav {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders navigation component with Sign In when user is not logged in', () => {
        const tree = renderer.create(<MainNav />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('ensure handleclick fires', () => {
        const wrapper = shallow(<MainNav />);
        const firstMenuItem = wrapper.find(Menu.Item).first();
        firstMenuItem.props().onClick(null, { name: 'home' });

        expect(wrapper.state().activeItem).toBe('home');
    });
});
