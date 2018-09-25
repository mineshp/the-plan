import React from 'react';
import { shallow } from 'enzyme';
import { MainNav } from '../MainNav';
import MainNavComponent from '../../../components/MainNav';
import { mockUser } from '../../../helpers/test/testData/authenticationData';

const props = {
    actions: {
        logout: jest.fn(() => (
            Promise.resolve()
        )),
        getUser: jest.fn(() => (
            Promise.resolve()
        ))
    }
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

describe('MainNav without a logged in user', () => {
    let noUserWrapper;
    beforeEach(() => {
        context.router.history.push.mockClear();
        noUserWrapper = shallow(<MainNav {...props} />, { context });
    });

    it('does not make a call to getUser on initial page load if user prop is not defined', () => {
        const componentDidMountSpy = jest.spyOn(MainNav.prototype, 'componentDidMount');
        noUserWrapper.instance().componentDidMount();

        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(noUserWrapper.props().user).toBeNull();
        expect(props.actions.getUser).not.toHaveBeenCalled();

        componentDidMountSpy.mockReset();
        componentDidMountSpy.mockRestore();
    });
});

describe('MainNav with logged in user', () => {
    let wrapper;
    let userProps;
    beforeEach(() => {
        context.router.history.push.mockClear();
        userProps = Object.assign({}, props, { user: mockUser() });
        wrapper = shallow(<MainNav {...userProps} />, { context });
    });

    it('renders MainNav component', () => {
        expect(wrapper.find(MainNavComponent).length).toEqual(1);
        expect(wrapper.props().user.username).toEqual('testUser');
    });

    it('makes a call to getUser on initial page load if user prop exists', () => {
        const componentDidMountSpy = jest.spyOn(MainNav.prototype, 'componentDidMount');
        wrapper.instance().componentDidMount();

        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(wrapper.props().user).toBeDefined();
        expect(userProps.actions.getUser).toHaveBeenCalled();

        componentDidMountSpy.mockReset();
        componentDidMountSpy.mockRestore();
    });

    it('calls the logout action when the logout function is invoked', async () => {
        wrapper.instance().logout();
        await expect(props.actions.logout).toHaveBeenCalled();
    });
});
