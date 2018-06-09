/* eslint-disable import/first */
jest.mock('../../Authentication/Auth');
import React from 'react';
import { shallow } from 'enzyme';
import { ManageProject } from '../ManageProject';
import ListProjectsComponent from '../../../components/Project/ListProjects';
import { mockListProjects } from '../../../helpers/test/testData/projectData';
import mockEvent from '../../../helpers/test/testData';
/* eslint-enable import/first */

const mockListAllProjects = mockListProjects();

const props = {
    actions: {
        deleteProject: jest.fn(() => (
            Promise.resolve()
        )),
        listProjects: jest.fn(() => (
            Promise.resolve(mockListAllProjects)
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    projects: {},
    notification: null
};

describe('Manage Projects', () => {
    describe('Get all projects success', () => {
        let wrapper;
        let successProjectsListsProps;
        beforeEach(() => {
            successProjectsListsProps = Object.assign({}, props, {
                notification: {
                    message: 'Retrieved projects',
                    level: 'success',
                    title: 'success'
                }
            });
            wrapper = shallow(<ManageProject {...successProjectsListsProps} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageProject.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        });

        it('calls the listProjects action when the fetchProjectsList function is invoked', async () => {
            wrapper.instance().fetchProjectsList();
            await expect(successProjectsListsProps.actions.listProjects).toHaveBeenCalled();
            await expect(successProjectsListsProps.actions.addNotification).toHaveBeenCalledWith(
                {
                    message: 'Retrieved projects',
                    level: 'success',
                    title: 'success'
                }
            );
        });

        it('renders a ListProjects component', async () => {
            const ManageProjectComponent = shallow(<ManageProject />);
            expect(ManageProjectComponent.find(ListProjectsComponent).length).toEqual(1);
        });

        it('builds an array of ProjectCards', async () => {
            const propsAfterFetchAllLists = Object.assign({}, props, { projects: { data: mockListAllProjects } });
            const ManageProjectComponent = shallow(<ManageProject {...propsAfterFetchAllLists} />);
            await expect(ManageProjectComponent.props().cards.length).toEqual(3);
        });
    });

    describe('Get all projects failure', () => {
        let wrapper;
        let propsAfterFetchProjectsError;
        beforeEach(() => {
            const propsActions = Object.assign({}, {
                deleteProject: jest.fn(() => (
                    Promise.resolve()
                )),
                listProjects: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            });

            const apiError = {
                error: {
                    isError: true,
                    message: 'Unable to retrieve a list summary, please try again later.'
                }
            };

            propsAfterFetchProjectsError = Object.assign({}, props,
                {
                    actions: propsActions,
                    projects: { error: apiError }
                }
            );

            wrapper = shallow(<ManageProject {...propsAfterFetchProjectsError} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
        it('calls the listProjects action when a user is not logged in, return notification error', async () => {
            wrapper.instance().fetchProjectsList();
            await expect(propsAfterFetchProjectsError.actions.listProjects).toHaveBeenCalled();
            await expect(propsAfterFetchProjectsError.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-dear',
                level: 'error',
                title: 'Unknown Error'
            });
        });
    });

    describe('handleDelete', () => {
        const propsAfterSuccessfulDelete = Object.assign(
            {}, props, {
                actions: {
                    deleteProject: jest.fn(() => (
                        Promise.resolve({
                            type: 'PROJECT_DELETION_SUCCESS'
                        })
                    )),
                    listProjects: jest.fn(() => (
                        Promise.resolve(mockListAllProjects)
                    )),
                    addNotification: jest.fn(() => (
                        Promise.resolve()
                    ))
                }
            },
        );


        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<ManageProject {...propsAfterSuccessfulDelete} />);
        });

        it('calls the deleteProject action when the handleDelete event is invoked', async () => {
            wrapper.instance().handleDelete(mockEvent());

            await expect(propsAfterSuccessfulDelete.actions.deleteProject).toHaveBeenCalledWith('123');
            await expect(propsAfterSuccessfulDelete.actions.deleteProject()).resolves.toEqual({ type: 'PROJECT_DELETION_SUCCESS' });
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });

        it('calls the fetchProjectList when a project was deleted successfully', async () => {
            wrapper.instance().fetchProjectsList();

            await expect(propsAfterSuccessfulDelete.actions.listProjects).toHaveBeenCalled();
            await expect(propsAfterSuccessfulDelete.actions.listProjects).toHaveBeenCalledTimes(2);
            await expect(propsAfterSuccessfulDelete.actions.listProjects()).resolves.toEqual(mockListAllProjects);
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });
    });
});
