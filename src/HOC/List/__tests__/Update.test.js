import React from 'react';
import { shallow } from 'enzyme';
import { UpdateList, buildProjectDropdownOptions } from '../Update';

const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({
                type: 'LIST_CREATION_SUCCESS'
            })
        )),
        listProjects: jest.fn(() => (
            Promise.resolve({
                type: 'PROJECT_LIST_RETRIEVED'
            })
        ))
    },
    projectOptions: [
        {
            key: 1,
            value: 'TEST1',
            text: 'TEST1'
        },
        {
            key: 2,
            value: 'TEST2',
            text: 'TEST2'
        }
    ],
    match: { params: {} }
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

const mockEvent = { preventDefault: jest.fn() };

describe('Create new list', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<UpdateList
            result={{}}
            {...props}
        />, { context });

        props.actions.create.mockClear();
    });

    it('calls componentWillMount', () => {
        const componentWillMountSpy = jest.spyOn(UpdateList.prototype, 'componentWillMount');
        wrapper.instance().componentWillMount();

        expect(componentWillMountSpy).toHaveBeenCalled();
        expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
        expect(props.match.params.id).toBeUndefined();
        expect(props.actions.listProjects).toHaveBeenCalled();

        componentWillMountSpy.mockReset();
        componentWillMountSpy.mockRestore();
    });

    it('calls the createOrUpdateList action when handleSubmit is called', async () => {
        wrapper.instance().handleSubmit(mockEvent);
        expect(wrapper.instance().props.match.params).toEqual({});
        await expect(props.actions.create).toHaveBeenCalled();
    });

    it('calls the redirect method when the createOrUpdateProject actions returns successfully', async () => {
        wrapper.instance().handleSubmit(mockEvent);

        await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
    });

    it('builds the projectOptions array for the drop down', () => {
        wrapper.setState({
            projects: {
                data: [
                    {
                        _id: '12345567',
                        projectName: 'proj1',
                    },
                    {
                        _id: '12345568',
                        projectName: 'proj2',
                    }
                ]
            }
        });
    });

    it('sets the listName when the handleChange event is invoked', () => {
        const event = {
            target: {
                value: 'Shopping List'
            }
        };
        wrapper.instance().handleChange(event);

        expect(wrapper.state().listName).toBe('Shopping List');
    });

    it('sets the projects assigned to the list when the handleDropDownSelection event is invoked', () => {
        wrapper.instance().handleDropDownSelection(mockEvent, { value: ['TEST_PROJECT'] });

        expect(wrapper.state().projects).toEqual(
            [
                {
                    id: expect.any(String),
                    name: 'TEST_PROJECT'
                }
            ]
        );
    });

    it('sets the heading columns assigned to the list when the handleHeaderInputChange event is invoked', () => {
        const event = {
            target: {
                value: 'Heading 001'
            }
        };
        wrapper.setState({
            headings: [{
                id: '123',
                name: ''
            }]
        });

        wrapper.instance().handleHeaderInputChange(event, { id: '123' });

        expect(wrapper.state().headings).toEqual(
            [
                {
                    id: '123',
                    name: 'Heading 001'
                }
            ]
        );
    });

    it('does not set the heading columns when the handleHeaderInputChange event is invoked with no value', () => {
        const event = {
            target: {
                value: ''
            }
        };
        wrapper.setState({
            headings: [{
                id: '123',
                name: ''
            }]
        });

        wrapper.instance().handleHeaderInputChange(event, { id: '123' });

        expect(wrapper.state().headings).toEqual(
            [
                {
                    id: '123',
                    name: ''
                }
            ]
        );
    });

    it('adds a heading object to headings when addHeading is invoked', () => {
        wrapper.setState({
            headings: [{
                id: '123',
                name: ''
            }]
        });

        wrapper.instance().addHeading();

        expect(wrapper.state().headings).toHaveLength(2);
        expect(wrapper.state().headings).toEqual(
            [
                {
                    id: '123',
                    name: ''
                },
                {
                    id: expect.any(String),
                    name: ''
                }
            ]
        );
    });

    it('removes a heading object from headings when removeHeading is invoked', () => {
        wrapper.setState({
            headings: [{
                id: '123',
                name: ''
            }]
        });

        wrapper.instance().removeHeading(mockEvent, { id: '123' });

        expect(wrapper.state().headings).toHaveLength(0);
        expect(wrapper.state().headings).toEqual([]);
    });

    it('does not remove a heading object if the heading id is not found in headings when removeHeading is invoked', () => {
        wrapper.setState({
            headings: [{
                id: '123',
                name: ''
            }]
        });

        wrapper.instance().removeHeading(mockEvent, { id: '999' });

        expect(wrapper.state().headings).toHaveLength(1);
        expect(wrapper.state().headings).toEqual([{
            id: '123',
            name: ''
        }]);
    });
});

describe('buildProjectDropdownOptions', () => {
    it('set the projectOptions dropdown successfully', () => {
        const listProjectsApiCall = {
            data: [
                {
                    _id: '12345',
                    projectName: 'proj1'
                },
                {
                    _id: '12346',
                    projectName: 'proj2'
                },
                {
                    _id: '12347',
                    projectName: 'proj3'
                },
            ]
        };

        expect(buildProjectDropdownOptions(listProjectsApiCall)).toEqual(
            [
                {
                    key: '12345',
                    text: 'proj1',
                    value: 'proj1',
                },
                {
                    key: '12346',
                    text: 'proj2',
                    value: 'proj2',
                },
                {
                    key: '12347',
                    text: 'proj3',
                    value: 'proj3',
                }
            ]
        );
    });

    it('set the projectOptions dropdown to empty if no projects are returened from the list projects api', () => {
        const listProjectsApiCall = { data: undefined };

        expect(buildProjectDropdownOptions(listProjectsApiCall)).toEqual([]);
    });
});

describe('Render loading', () => {
    let updateListWithNoResultsWrapper;
    let noResultProps;
    beforeEach(() => {
        noResultProps = {
            actions: {
                create: jest.fn(() => (
                    Promise.resolve({
                        type: 'LIST_CREATION_SUCCESS'
                    })
                )),
                listProjects: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROJECT_LIST_RETRIEVED'
                    })
                ))
            },
            projectOptions: [{
                id: '1'
            }]
        };

        updateListWithNoResultsWrapper = shallow(<UpdateList
            {...noResultProps}
        />, { context });

        props.actions.create.mockClear();
    });

    it('shows loading data when no results exist', () => {
        expect(updateListWithNoResultsWrapper.props().children).toBe('Loading Data...');
    });

    it('shows loading data when no projectOptions exist', () => {
        const noProjectOptionsProps = Object.assign({}, noResultProps, {
            result: {
                _id: '123'
            },
            projectOptions: []
        });

        const updateListWithNoProjectOptionsWrapper = shallow(<UpdateList
            {...noProjectOptionsProps}
        />, { context });
        expect(updateListWithNoProjectOptionsWrapper.props().children).toBe('Loading Data...');
    });
});
