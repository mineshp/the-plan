import React from 'react';
import { shallow } from 'enzyme';
import { ControlCenter } from '../ControlCenter';
import mockEvent from '../../../helpers/test/testData';
import { mockListUsers } from '../../../helpers/test/testData/controlCenterData';
import LoadingComponent from '../../../components/Shared/Loading';

const mockUsers = mockListUsers();

const props = {
    actions: {
        retrieveUsers: jest.fn(() => (
            Promise.resolve({
                type: 'USERS_RETRIEVED',
                mockUsers
            })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    notification: null,
    controlCenter: {
        users: []
    }
};

describe('ControlCenter', () => {
    describe('list users is successful', () => {
        let wrapper;

        const propsWithControlCenterData = Object.assign({}, props, {
            controlCenter: {
                users: mockUsers
            },
            notification: {
                message: 'Retrieved user summary',
                level: 'success',
                title: 'success'
            }
        });

        beforeEach(() => {
            wrapper = shallow(<ControlCenter {...propsWithControlCenterData} />);

            propsWithControlCenterData.actions.retrieveUsers.mockClear();
            propsWithControlCenterData.actions.addNotification.mockClear();
        });

        it('calls componentDidMount', () => {
            const componentDidMountSpy = jest.spyOn(ControlCenter.prototype, 'componentDidMount');
            wrapper.instance().componentDidMount();

            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

            componentDidMountSpy.mockReset();
            componentDidMountSpy.mockRestore();
        });

        it('calls the retrieveSummaryListsByProject action when the fetchAllUsers function is invoked ', async () => {
            wrapper.instance().fetchAllUsers();
            await expect(propsWithControlCenterData.actions.retrieveUsers).toHaveBeenCalled();
            await expect(propsWithControlCenterData.actions.addNotification).toHaveBeenCalledWith({
                message: 'Retrieved user summary',
                level: 'success',
                title: 'success'
            });
        });

        it('calls handleResetPwd when Reset Password is requested', async () => {
            const resetPasswordEvent = Object.assign({}, { id: 123456 });


            await wrapper.instance().handleResetPwd(mockEvent(), resetPasswordEvent);

            // expect(wrapper.state().username).toEqual('test');
        });

        it('calls handleDeleteUser when Delete user is requested', async () => {
            const deleteUserEvent = Object.assign({}, { id: 123456 });

            await wrapper.instance().handleDeleteUser(mockEvent(), deleteUserEvent);

            // expect(wrapper.state().username).toEqual('test');
        });
    });

    describe('list users fail', () => {
        let wrapper;
        let propsAfterFetchUsersError;

        const apiError = {
            error: {
                isError: true,
                message: 'Unable to retrieve users, please try again later.'
            }
        };

        beforeEach(() => {
            const propsActions = Object.assign({}, {
                retrieveUsers: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            });

            propsAfterFetchUsersError = Object.assign({}, props,
                {
                    actions: propsActions,
                    controlCenter: {}
                }
            );
            wrapper = shallow(<ControlCenter {...propsAfterFetchUsersError} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('displays loading component when action to fetch users is not complete', async () => {
            wrapper = shallow(<ControlCenter {...propsAfterFetchUsersError} />);
            expect(wrapper.props().controlCenter).toBe(undefined);
            expect(wrapper.find(LoadingComponent).length).toEqual(1);
        });

        it('retrieveSummaryLists - sets the notification to unknown error when no props notification exists', async () => {
            wrapper.instance().fetchAllUsers();
            await expect(propsAfterFetchUsersError.actions.retrieveUsers).toHaveBeenCalled();
            await expect(propsAfterFetchUsersError.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-dear',
                level: 'error',
                title: 'Unknown Error'
            });
        });
    });

});
