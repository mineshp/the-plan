import React from 'react';
import LeftHandMenu from '../LeftHandMenu';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react'

describe('LeftHandMenu Component', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<LeftHandMenu />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('ensure correct menu items found', () => {
        const wrapper = shallow(<LeftHandMenu />);
        expect(wrapper.find(Menu).length).toBe(1);
        expect(wrapper.find(Menu.Item).length).toBe(3);
    });

    it('ensure activeItem is set when a menu item is selected', () => {
        const mockHandleClick = jest.fn();

        const wrapper = shallow(<LeftHandMenu />);
        const firstMenuItem = wrapper.find(Menu.Item).first();
        firstMenuItem.props().onClick(null, { name: 'testabc' });

        expect(wrapper.state().activeItem).toBe('testabc');
    });
});