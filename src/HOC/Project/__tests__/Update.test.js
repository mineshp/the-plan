import React from 'react';
import { shallow } from 'enzyme';
import { UpdateProject } from '../Update';
import LoadingComponent from '../../../components/Shared/Loading';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';


const mockEvent = { preventDefault: jest.fn() };

const mockProfiles = mockListProfiles();
const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleProjectDescriptionChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();

const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({})
        )),
        update: jest.fn(() => (
            Promise.resolve({})
        )),
        fetchSingleProject: jest.fn(() => (
            Promise.resolve({})
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        )),
        retrieveProfiles: jest.fn(() => (
            Promise.resolve({})
        ))
    },
    notification: null,
    authentication: {
        user: { username: 'testUser' }
    },
    match: { params: {} },
    admin: {}
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

describe('Project', () => {
    describe('Create', () => {
        let wrapper;

        const propsActions = Object.assign({}, props.actions, {
            retrieveProfiles: jest.fn(() => (
                Promise.resolve({
                    type: 'PROFILES_RETRIEVED',
                    mockProfiles
                })
            ))
        });

        const newProjectProps = Object.assign({}, props, {
            notification: {
                message: 'Project created',
                level: 'success',
                title: 'success'
            },
            result: {
                profilesAssigned: []
            },
            admin: {
                controlCentre: {
                    profiles: mockProfiles
                }
            },
            actions: propsActions
        });

        beforeEach(() => {
            wrapper = shallow(<UpdateProject
                result={{}}
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                projectName="A new project"
                {...newProjectProps}
            />, { context });

            newProjectProps.actions.create.mockClear();
            newProjectProps.actions.retrieveProfiles.mockClear();
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(UpdateProject.prototype, 'componentDidMount');
            wrapper.instance().componentDidMount();

            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
            await expect(newProjectProps.actions.retrieveProfiles).toHaveBeenCalled();
            expect(newProjectProps.match.params.id).toBeUndefined();
            await expect(newProjectProps.actions.fetchSingleProject).not.toHaveBeenCalled();

            componentDidMountSpy.mockReset();
            componentDidMountSpy.mockRestore();
        });

        it('sets the projectName when the handleChange event is invoked', () => {
            const event = {
                target: {
                    value: 'Black Widow'
                }
            };

            wrapper.instance().handleChange(event);

            expect(wrapper.state().projectName).toBe('Black Widow');
        });

        it('sets the colour when the handleDropDownSelection event is invoked', () => {
            wrapper.instance().handleDropDownSelection(mockEvent, { value: 'black' });

            expect(wrapper.state().colour).toBe('black');
        });

        it('sets the profile checkboxes state when the handleCheckboxSelectionForProfiles event is invoked', () => {
            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileA',
                checked: true
            });
            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileB',
                checked: true
            });

            expect(wrapper.state().profilesAssigned).toEqual([
                'profileA',
                'profileB'
            ]);
        });

        it('calls the createOrUpdateProject action when handleSubmit is called', async () => {
            wrapper.instance().handleSubmit(mockEvent);
            expect(wrapper.instance().props.match.params).toEqual({});
            await expect(newProjectProps.actions.create).toHaveBeenCalled();
            await expect(newProjectProps.actions.addNotification).toHaveBeenCalledWith({
                message: 'Project created',
                level: 'success',
                title: 'success'
            });
            await expect(newProjectProps.actions.update).not.toHaveBeenCalled();
        });

        it('calls the redirect method when the createOrUpdateProject actions returns successfully', async () => {
            wrapper.instance().handleSubmit(mockEvent);
            await expect(context.router.history.push).toHaveBeenCalledWith('/project/all');
        });
    });
    describe('Update', () => {
        const propsActions = Object.assign({}, props.actions, {
            retrieveProfiles: jest.fn(() => (
                Promise.resolve({
                    type: 'PROFILES_RETRIEVED',
                    mockProfiles
                })
            ))
        });


        const updateParams = {
            match: { params: { id: '56789' } },
            result: {
                _id: '56789',
                projectName: 'Hawkeye',
                projectDescription: 'A project about something.',
                colour: 'red',
                profilesAssigned: ['profileX']
            },
            notification: {
                message: 'Project updated',
                level: 'success',
                title: 'success'
            },
            admin: {
                controlCentre: {
                    profiles: mockProfiles
                }
            },
            actions: propsActions
        };

        const updateProps = Object.assign({}, props, updateParams);
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<UpdateProject
                profiles={mockProfiles}
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                {...updateProps}
            />, { context });

            updateProps.actions.update.mockClear();
        });

        it('componentDidMount', async () => {
            const componentDidMountUpdateSpy = jest.spyOn(UpdateProject.prototype, 'componentDidMount');
            wrapper.instance().componentDidMount();

            expect(componentDidMountUpdateSpy).toHaveBeenCalledTimes(1);
            await expect(updateProps.actions.retrieveProfiles).toHaveBeenCalled();
            expect(updateProps.match.params.id).not.toBeUndefined();
            await expect(updateProps.actions.fetchSingleProject).toHaveBeenCalled();

            componentDidMountUpdateSpy.mockReset();
            componentDidMountUpdateSpy.mockRestore();
        });

        it('sets the profile checkboxes state to true when the handleCheckboxSelectionForProfiles event is invoked for an existing project', () => {
            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileA',
                checked: true
            });

            expect(wrapper.state().profilesAssigned).toEqual([
                'profileX',
                'profileA'
            ]);

            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileB',
                checked: true
            });

            expect(wrapper.state().profilesAssigned).toEqual([
                'profileX',
                'profileA',
                'profileB'
            ]);
        });

        it('sets the profile checkboxes state to false when the handleCheckboxSelectionForProfiles event is invoked for an existing project', () => {
            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileA',
                checked: true
            });

            expect(wrapper.state().profilesAssigned).toEqual([
                'profileX',
                'profileA'
            ]);

            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileX',
                checked: false
            });

            expect(wrapper.state().profilesAssigned).toEqual(['profileA']);
        });

        it('calls createOrUpdateProject action with correct data when handleSubmit is called but no changes have been made', async () => {
            wrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '56789',
                projectName: 'Hawkeye',
                projectDescription: 'A project about something.',
                colour: 'red',
                createdDate: expect.anything(),
                profilesAssigned: ['profileX']
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('calls createOrUpdateProject action with correct data when handleSubmit is called and projectName has been updated', async () => {
            const event = { target: { value: 'Black Panther' } };

            wrapper.instance().handleChange(event);
            wrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '56789',
                projectName: 'Black Panther',
                projectDescription: 'A project about something.',
                colour: 'red',
                createdDate: expect.anything(),
                profilesAssigned: ['profileX']
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('calls createOrUpdateProject action with correct data when handleSubmit is called and the projectDecription has been updated', async () => {
            const event = { target: { value: 'Project about marvels black panther.' } };

            wrapper.instance().handleProjectDescriptionChange(event);
            wrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '56789',
                projectName: 'Hawkeye',
                projectDescription: 'Project about marvels black panther.',
                colour: 'red',
                createdDate: expect.anything(),
                profilesAssigned: ['profileX']
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('calls createOrUpdateProject action with correct data when handleSubmit is called and the colour has been updated', async () => {
            wrapper.instance().handleDropDownSelection(mockEvent, { value: 'blue' });
            await wrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '56789',
                projectName: 'Hawkeye',
                projectDescription: 'A project about something.',
                colour: 'blue',
                createdDate: expect.anything(),
                profilesAssigned: ['profileX']
            });
            await expect(props.actions.addNotification).toHaveBeenCalledWith({
                message: 'Project updated',
                level: 'success',
                title: 'success'
            });
        });

        it('calls createOrUpdateProject action with correct data when handleSubmit is called and the profile checkbox has been updated', async () => {
            wrapper.instance().handleCheckboxSelectionForProfiles(mockEvent, {
                'data-cb': 'profileA',
                checked: true
            });

            await wrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '56789',
                projectName: 'Hawkeye',
                projectDescription: 'A project about something.',
                colour: 'red',
                createdDate: expect.anything(),
                profilesAssigned: ['profileX', 'profileA']
            });
            await expect(props.actions.addNotification).toHaveBeenCalledWith({
                message: 'Project updated',
                level: 'success',
                title: 'success'
            });
        });

        it('calls the redirect method when the createOrUpdateProject actions returns successfully', async () => {
            wrapper.setState({
                projectName: 'some other project name',
                projectDescription: 'A project about something.',
                colour: 'green',
                profilesAssigned: []
            });
            wrapper.instance().handleSubmit(mockEvent);
            await expect(context.router.history.push).toHaveBeenCalledWith('/project/all');
        });
    });

    describe('create or update call fail due to user not being logged in', () => {
        let wrapper;
        let propsActions;

        beforeEach(() => {
            props.actions.addNotification.mockReset();
            propsActions = Object.assign({}, {
                create: jest.fn(() => (
                    Promise.resolve({
                        error: 'oh-no'
                    })
                )),
                update: jest.fn(() => (
                    Promise.resolve({
                        error: 'oh-dear'
                    })
                )),
                fetchSingleProject: jest.fn(() => (
                    Promise.resolve({})
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                )),
                retrieveProfiles: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILES_RETRIEVED',
                        mockProfiles
                    })
                ))
            });
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
        it('creates a project', async () => {
            const updateProps = Object.assign({}, props, {
                actions: propsActions,
                admin: {
                    controlCentre: {
                        profiles: mockProfiles
                    }
                }
            });

            wrapper = shallow(<UpdateProject
                profiles={mockProfiles}
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                projectName="A new project"
                {...updateProps}
            />, { context });

            wrapper.instance().createOrUpdateProject();
            await expect(updateProps.actions.create).toHaveBeenCalled();
            await expect(updateProps.actions.update).not.toHaveBeenCalled();
            await expect(updateProps.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-no',
                level: 'error',
                title: 'Unknown Error'
            });
        });

        it('updates a project', async () => {
            const updateProps = Object.assign({}, props, {
                actions: propsActions,
                result: { _id: '1234' },
                admin: {
                    controlCentre: {
                        profiles: mockProfiles
                    }
                },
            });

            wrapper = shallow(<UpdateProject
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                projectName="A new project"
                {...updateProps}
            />, { context });

            wrapper.instance().createOrUpdateProject();
            await expect(updateProps.actions.update).toHaveBeenCalled();
            await expect(updateProps.actions.create).not.toHaveBeenCalled();
            await expect(updateProps.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-dear',
                level: 'error',
                title: 'Unknown Error'
            });
        });
    });

    describe('Render loading', () => {
        let updateProjectWithNoResultsWrapper;

        it('shows loading data when no results exist', () => {
            updateProjectWithNoResultsWrapper = shallow(<UpdateProject
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                projectName="A new project"
                {...props}
            />, { context });

            props.actions.update.mockClear();
            expect(updateProjectWithNoResultsWrapper.contains(<LoadingComponent />)).toBe(true);
        });

        it('shows loading data when no profiles exist', () => {
            const renderNoProfilesParams = {
                admin: {
                    controlCentre: {
                        profiles: []
                    }
                }
            };

            const renderProps = Object.assign({}, props, renderNoProfilesParams);

            updateProjectWithNoResultsWrapper = shallow(<UpdateProject
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleSubmit={handleSubmitMock}
                handleProjectDescriptionChangeMock={handleProjectDescriptionChangeMock}
                projectName="A new project"
                result={{}}
                profiles={[]}
                {...renderProps}
            />, { context });

            renderProps.actions.retrieveProfiles.mockClear();

            expect(updateProjectWithNoResultsWrapper.contains(<LoadingComponent />)).toBe(true);
        });
    });
});
