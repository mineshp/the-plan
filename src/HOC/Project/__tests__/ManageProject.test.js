import React from 'react';
import { shallow } from 'enzyme';
import { ManageProject } from '../ManageProject';
import ListProjectsComponent from '../../../components/Project/ListProjects';

const props = { actions: { deleteProject: jest.fn() } };

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

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Manage Projects', () => {
    describe('Get all projects success', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListAllProjects))));
        });

        it('calls componentDidMount', () => {
            const componentDidMountSpy = jest.spyOn(ManageProject.prototype, 'componentDidMount');
            const wrapper = shallow(<ManageProject />);
            wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
        });

        it('fetch all projects', async () => {
            const wrapper = shallow(<ManageProject />);
            expect(wrapper.state().projects).toEqual([]);
            expect(wrapper.state().apiError).toBe(null);
            await fetch('/foo/bar')
                .then((res) => res.json())
                .then((projects) => expect(projects).toEqual(mockListAllProjects));
        });

        it('renders a ListProjects component', async () => {
            const ManageProjectComponent = shallow(<ManageProject />);
            ManageProjectComponent.setState({ projects: mockListAllProjects });
            expect(ManageProjectComponent.find(ListProjectsComponent).length).toEqual(1);
        });
    });

    describe('Get all projects fails', () => {
        beforeEach(() => {
            window.fetch = jest.fn().mockReturnValue(Promise.resolve({}));
        });

        it('sets an api error when the client is unable to connect to the api', async () => {
            const wrapper = shallow(<ManageProject />);
            await wrapper.instance().componentDidMount();

            expect(wrapper.state().apiError).toEqual({
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

        it('calls the deleteProject action when the handleDelete event is invoked', async () => {
            const wrapper = shallow(<ManageProject {...props} />);

            await wrapper.instance().handleDelete(mockEvent);
            expect(props.actions.deleteProject).toHaveBeenCalledWith('123');
        });
    });
});
