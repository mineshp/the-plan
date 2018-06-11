import React from 'react';
import { shallow } from 'enzyme';
import { MainNav } from '../MainNav';
import MainNavComponent from '../../../components/MainNav';
import { mockUser } from '../../../helpers/test/testData/authenticationData';

const props = {
    user: mockUser(),
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

describe('MainNav', () => {
    let wrapper;
    beforeEach(() => {
        context.router.history.push.mockClear();
        wrapper = shallow(<MainNav {...props} />, { context });
    });

    it('renders MainNav component', () => {
        expect(wrapper.find(MainNavComponent).length).toEqual(1);
        expect(wrapper.props().user.username).toEqual('testUser');
    });

    it('makes a call to getUser on initial page load', () => {
        const componentDidMountSpy = jest.spyOn(MainNav.prototype, 'componentDidMount');
        wrapper.instance().componentDidMount();

        expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        expect(props.actions.getUser).toHaveBeenCalled();

        componentDidMountSpy.mockReset();
        componentDidMountSpy.mockRestore();
    });

    it('calls the logout action when the logout function is invoked', async () => {
        wrapper.instance().logout();
        await expect(props.actions.logout).toHaveBeenCalled();
    });
});
