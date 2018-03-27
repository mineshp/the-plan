import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Menu, Dropdown } from 'semantic-ui-react';
import MainNav from '../MainNav';

describe('MainNav Component', () => {
    const props = {
        username: 'testUser',
        isAdmin: false,
        logout: jest.fn()
    };

    const mockEvent = () => ({
        preventDefault: jest.fn()
    });

    describe('Guest User', () => {
        const guestProps = Object.assign({}, props, { username: null });

        it('renders navigation component with Sign In when user is not logged in', () => {
            const tree = renderer.create(<MainNav {...guestProps} />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('displays a Sign-In menu', () => {
            const wrapper = shallow(<MainNav {...guestProps} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            expect(UserMenu.props().children).toEqual('Sign-in');
        });
    });

    describe('Logged In User - non admin', () => {
        it('renders navigation component with Username when user is logged in', () => {
            const tree = renderer.create(<MainNav {...props} />).toJSON();
            expect(tree).toMatchSnapshot();
        });

        it('displays the username', () => {
            const wrapper = shallow(<MainNav {...props} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            expect(UserMenu.children().props().text).toEqual('TestUser');
        });

        it('does not show the control centre menu item if user is not admin', () => {
            const wrapper = shallow(<MainNav {...props} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            const UserDropDown = UserMenu.find(Dropdown.Item).childAt(1);
            expect(UserDropDown.props()).toEqual({});
        });

        it('displays a logout menu in the drop down', () => {
            const wrapper = shallow(<MainNav {...props} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            const LogOut = UserMenu.find(Dropdown.Item).first();
            expect(LogOut.props().children).toEqual('Logout');
        });

        it('calls logout', () => {
            const wrapper = shallow(<MainNav {...props} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            const LogOut = UserMenu.find(Dropdown.Item).first();
            wrapper.find(LogOut.props()).simulate('click', mockEvent());
            expect(props.logout).toHaveBeenCalled();
        });
    });

    describe('Logged In User - admin', () => {
        let adminUserProp;
        beforeEach(() => {
            adminUserProp = Object.assign({}, props, { isAdmin: true });
        });

        it('does show the control centre menu item if user is admin', () => {
            const wrapper = shallow(<MainNav {...adminUserProp} />);
            const UserMenu = wrapper.find(Menu.Item).last();
            const UserDropDown = UserMenu.find(Dropdown.Item).first();
            expect(UserDropDown.props().children).toEqual('Control Centre');
        });
    });

    describe('Displays moto specific to user', () => {
        it('displays the correct moto for minesh', () => {
            const mUserProps = Object.assign({}, props, { username: 'minesh' });
            const wrapper = shallow(<MainNav {...mUserProps} />);
            const moto = wrapper.find(Menu.Item).at(1);
            expect(moto.props().children.props.children).toEqual('Haz tus sueños realidad');
        });

        it('displays the correct moto for jignasha', () => {
            const mUserProps = Object.assign({}, props, { username: 'Jignasha' });
            const wrapper = shallow(<MainNav {...mUserProps} />);
            const moto = wrapper.find(Menu.Item).at(1);
            expect(moto.props().children.props.children).toEqual('Te amo mucho, Bella');
        });

        it('displays the correct moto for any other user', () => {
            const mUserProps = Object.assign({}, props, { username: 'testUser' });
            const wrapper = shallow(<MainNav {...mUserProps} />);
            const moto = wrapper.find(Menu.Item).at(1);
            expect(moto.props().children.props.children).toEqual('Make your dreams a reality');
        });
    });

    it('ensure handleclick fires', () => {
        const wrapper = shallow(<MainNav {...props} />);
        const firstMenuItem = wrapper.find(Menu.Item).first();
        firstMenuItem.props().onClick(null, { name: 'home' });

        expect(wrapper.state().activeItem).toBe('home');
    });
});
