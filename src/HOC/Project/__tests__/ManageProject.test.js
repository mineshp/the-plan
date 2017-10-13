import React from 'react';
import { shallow } from 'enzyme';
import { ManageProject } from '../ManageProject';
import ListProjectsComponent from '../../../components/Project/ListProjects';

const mockListAllProjects = [
    {
        _id: '5992d50066a7043f2598e12d',
        projectName: 'PROJECT 1',
        colour: 'red',
        createdDate: '2017-08-15T12:02:00.000Z'
    },
    {
        _id: '59a08710e57cb1da97cd1477',
        projectName: 'PROJECT 2',
        colour: 'red',
        __v: 0,
        createdDate: '2017-08-25T20:22:40.994Z'
    },
    {
        _id: '59a08bb6e57cb1da97cd1478',
        projectName: 'PROJECT 3',
        colour: 'grey',
        __v: 0,
        createdDate: '2017-08-25T20:42:30.159Z'
    }
];

const props = {
    actions: {
        deleteProject: jest.fn(() => (
            Promise.resolve()
        )),
        listProjects: jest.fn(() => (
            Promise.resolve(mockListAllProjects)
        ))
    },
    projects: {} // TODO: Turn to ARRAY
};

describe('Manage Projects', () => {
    describe('Get all projects success', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ManageProject {...props} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageProject.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        });

        it('calls the listProjects action when the fetchProjectsList function is invoked', async () => {
            wrapper.instance().fetchProjectsList();
            await expect(props.actions.listProjects).toHaveBeenCalled();
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

    describe('Get all projects fails', () => {
        it('sets an api error when the client is unable to connect to the api', async () => {
            const apiError = {
                error: {
                    isError: true,
                    message: 'Unable to retrieve projects, please try again later.'
                }
            };
            const propsAfterFetchListsError = Object.assign({}, props, { projects: { error: apiError } });
            const ManageProjectComponent = shallow(<ManageProject {...propsAfterFetchListsError} />);

            expect(ManageProjectComponent.props().errors).toEqual({
                error: {
                    message: 'Unable to retrieve projects, please try again later.',
                    isError: true
                }
            });
        });
    });

    describe('handleDelete', () => {
        const mockEvent = {
            preventDefault: jest.fn(),
            target: {
                value: '123'
            }
        };

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
                    ))
                }
            },
        );


        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<ManageProject {...propsAfterSuccessfulDelete} />);
        });

        it('calls the deleteProject action when the handleDelete event is invoked', async () => {
            wrapper.instance().handleDelete(mockEvent);

            await expect(propsAfterSuccessfulDelete.actions.deleteProject).toHaveBeenCalledWith('123');
            await expect(propsAfterSuccessfulDelete.actions.deleteProject()).resolves.toEqual({ type: 'PROJECT_DELETION_SUCCESS' });
        });

        it('calls the fetchProjectList when a project was deleted successfully', async () => {
            wrapper.instance().fetchProjectsList();

            await expect(propsAfterSuccessfulDelete.actions.listProjects).toHaveBeenCalled();
            await expect(propsAfterSuccessfulDelete.actions.listProjects).toHaveBeenCalledTimes(2);
            await expect(propsAfterSuccessfulDelete.actions.listProjects()).resolves.toEqual(mockListAllProjects);
        });
    });
});
