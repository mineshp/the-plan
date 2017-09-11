import React from 'react';
import MainNav from '../MainNav';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react'

describe('MainNav Component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<MainNav />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('ensure handleclick fires', () => {
        const mockHandleClick = jest.fn();

        const wrapper = shallow(<MainNav />);
        const firstMenuItem = wrapper.find(Menu.Item).first();
        firstMenuItem.props().onClick(null, { name: 'home' });

        expect(wrapper.state().activeItem).toBe('home');
    });
});