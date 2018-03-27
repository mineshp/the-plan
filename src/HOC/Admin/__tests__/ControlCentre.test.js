import React from 'react';
import { shallow } from 'enzyme';
import { ControlCentre } from '../ControlCentre';
import mockEvent from '../../../helpers/test/testData';
import { mockListUsers, mockListProfiles, mockProfileCreated } from '../../../helpers/test/testData/controlCentreData';
import { mockProjectData, mockProjectDataWithProfileA, mockListProjects } from '../../../helpers/test/testData/projectData';

import LoadingComponent from '../../../components/Shared/Loading';

const mockUsers = mockListUsers();
const mockProfiles = mockListProfiles();
const mockProfile = mockProfileCreated();
const mockProjects = mockListProjects();
const mockProject = mockProjectData();
const mockProjectWithProfileA = mockProjectDataWithProfileA();

const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({})
        )),
        updateProfile: jest.fn(() => (
            Promise.resolve({})
        )),
        retrieveUsers: jest.fn(() => (
            Promise.resolve({})
        )),
        deleteUser: jest.fn(() => (
            Promise.resolve({})
        )),
        retrieveProfiles: jest.fn(() => (
            Promise.resolve({})
        )),
        deleteProfile: jest.fn(() => (
            Promise.resolve({})
        )),
        listProjects: jest.fn(() => (
            Promise.resolve([])
        )),
        updateProject: jest.fn(() => (
            Promise.resolve({})
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    notification: null,
    admin: {}
};

describe('ControlCentre', () => {
    describe('View Users', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                retrieveUsers: jest.fn(() => (
                    Promise.resolve({
                        type: 'USERS_RETRIEVED',
                        mockUsers
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        users: mockUsers,
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Retrieved user summary',
                    level: 'success',
                    title: 'success'
                },
                projects: mockProjects,
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveUsers.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            it('calls componentDidMount', () => {
                const componentDidMountSpy = jest.spyOn(ControlCentre.prototype, 'componentDidMount');
                wrapper.instance().componentDidMount();

                expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

                componentDidMountSpy.mockReset();
                componentDidMountSpy.mockRestore();
            });

            it('calls the retrieveUsers action when the fetchAllUsers function is invoked ', async () => {
                wrapper.instance().fetchAllUsers();
                await expect(propsWithControlCentreData.actions.retrieveUsers).toHaveBeenCalled();
                await expect(propsWithControlCentreData.actions.addNotification).toHaveBeenCalledWith({
                    message: 'Retrieved user summary',
                    level: 'success',
                    title: 'success'
                });
            });

            it('calls handleResetPwd when Reset Password is requested', async () => {
                const resetPasswordEvent = Object.assign({}, { id: 123456 });
                await wrapper.instance().handleResetPwd(mockEvent(), resetPasswordEvent);
            });

            it('calls handleDeleteUser when Delete user is requested', async () => {
                const deleteUserEvent = Object.assign({}, { id: 123456 });

                await wrapper.instance().handleDeleteUser(mockEvent(), deleteUserEvent);
                await expect(propsWithControlCentreData.actions.deleteUser).toHaveBeenCalledWith(123456);
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                retrieveUsers: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                ))
            });

            const propsAfterFetchUsersError = Object.assign({}, props, {
                admin: {},
                actions: propsActions
            });

            beforeEach(() => {
                propsAfterFetchUsersError.actions.retrieveUsers.mockClear();
                propsAfterFetchUsersError.actions.addNotification.mockClear();
                wrapper = shallow(<ControlCentre {...propsAfterFetchUsersError} />);
            });

            it('displays loading component when action to fetch users is not complete', async () => {
                wrapper = shallow(<ControlCentre {...propsAfterFetchUsersError} />);
                expect(wrapper.props().controlCentre).toBe(undefined);
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

    describe('Profiles Accordion', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ControlCentre {...props} />);

            props.actions.retrieveUsers.mockClear();
            props.actions.addNotification.mockClear();
        });

        it('calls handleManageProfilesAccordionClick when Accordion is clicked for profiles', async () => {
            await wrapper.instance().handleManageProfilesAccordionClick(mockEvent(), 1);
            await expect(wrapper.state().activeIndex).toEqual(1);
        });

        it('calls handleManageProfilesAccordionClick when index does not match', async () => {
            await wrapper.instance().handleManageProfilesAccordionClick(mockEvent(), 0);
            await expect(wrapper.state().activeIndex).toEqual(-1);
        });
    });

    describe('View Profiles', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                retrieveProfiles: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILES_RETRIEVED',
                        mockProfiles
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Retrieved profiles summary',
                    level: 'success',
                    title: 'success'
                },
                projects: mockProjects,
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveProfiles.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            afterEach(() => {
                jest.clearAllMocks();
            });

            it('calls componentDidMount', () => {
                const componentDidMountSpy = jest.spyOn(ControlCentre.prototype, 'componentDidMount');
                wrapper.instance().componentDidMount();

                expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

                expect(wrapper.state()).toEqual({
                    activeIndex: 0,
                    active: false,
                    name: null,
                    profileNameToAssignProjects: null,
                    projectsToAssignProfile: []
                });

                componentDidMountSpy.mockReset();
                componentDidMountSpy.mockRestore();
            });

            it('calls the retrieveProfiles action when the fetchAllProfiles function is invoked ', async () => {
                wrapper.instance().fetchAllProfiles();
                await expect(propsWithControlCentreData.actions.retrieveProfiles).toHaveBeenCalled();
                await expect(propsWithControlCentreData.actions.addNotification).toHaveBeenCalledWith({
                    message: 'Retrieved profiles summary',
                    level: 'success',
                    title: 'success'
                });
            });

            it('calls handleResetPwd when Reset Password is requested', async () => {
                const resetPasswordEvent = Object.assign({}, { id: 123456 });
                await wrapper.instance().handleResetPwd(mockEvent(), resetPasswordEvent);
            });

            it('calls handleDeleteUser when Delete user is requested', async () => {
                const deleteUserEvent = Object.assign({}, { id: 123456 });

                await wrapper.instance().handleDeleteUser(mockEvent(), deleteUserEvent);
                await expect(propsWithControlCentreData.actions.deleteUser).toHaveBeenCalledWith(123456);
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                retrieveProfiles: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                ))
            });

            const propsAfterFetchProfilesError = Object.assign({}, props, {
                admin: {},
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsAfterFetchProfilesError} />);

                propsAfterFetchProfilesError.actions.retrieveProfiles.mockClear();
                propsAfterFetchProfilesError.actions.addNotification.mockClear();
            });

            it('displays loading component when action to fetch profiles is not complete', async () => {
                wrapper = shallow(<ControlCentre {...propsAfterFetchProfilesError} />);
                expect(wrapper.props().controlCentre).toBe(undefined);
                expect(wrapper.find(LoadingComponent).length).toEqual(1);
            });

            it('retrieveSummaryLists - sets the notification to unknown error when no props notification exists', async () => {
                wrapper.instance().fetchAllProfiles();
                await expect(propsAfterFetchProfilesError.actions.retrieveProfiles).toHaveBeenCalled();
                await expect(propsAfterFetchProfilesError.actions.addNotification).toHaveBeenCalledWith({
                    message: 'oh-dear',
                    level: 'error',
                    title: 'Unknown Error'
                });
            });
        });
    });

    describe('Create Profile', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                create: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILE_CREATION_SUCCESS',
                        success: { data: mockProfile }
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        users: mockUsers,
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Created profile',
                    level: 'success',
                    title: 'success'
                },
                projects: mockProjects,
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveUsers.mockClear();
                propsWithControlCentreData.actions.retrieveProfiles.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            it('calls handleProfileNameChange when name is entered when creating a new profile', async () => {
                const profileNameInputEvent = Object.assign({}, mockEvent(), { target: { value: 'NEW_PROFILE' } });
                await wrapper.instance().handleProfileNameChange(profileNameInputEvent);
                await expect(wrapper.state().name).toEqual('NEW_PROFILE');
            });

            it('calls handleProfileActiveChange when active is checked when creating a new profile', async () => {
                await wrapper.instance().handleProfileActiveChange();
                await expect(wrapper.state().active).toEqual(true);
            });

            it('calls createProfile action with correct data when handleSubmit is called and name has been updated', async () => {
                const profileNameInputEvent = Object.assign({}, mockEvent(), { target: { value: 'TEST_NEW_PROFILE' } });
                await wrapper.instance().handleProfileNameChange(profileNameInputEvent);
                await wrapper.instance().handleSubmit(mockEvent());

                await expect(propsWithControlCentreData.actions.create).toHaveBeenCalledWith({
                    name: 'TEST_NEW_PROFILE',
                    activeIndex: 0,
                    active: false,
                    profileNameToAssignProjects: null,
                    projectsToAssignProfile: []
                });
                await expect(propsWithControlCentreData.actions.addNotification).toHaveBeenCalledWith({
                    message: 'Created profile',
                    level: 'success',
                    title: 'success'
                });

                await expect(propsWithControlCentreData.actions.retrieveUsers).toHaveBeenCalled();
                await expect(propsWithControlCentreData.actions.retrieveProfiles).toHaveBeenCalled();
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                create: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                ))
            });

            const propsAfterCreateProfileError = Object.assign({}, props, {
                admin: {},
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsAfterCreateProfileError} />);

                propsAfterCreateProfileError.actions.retrieveUsers.mockClear();
                propsAfterCreateProfileError.actions.retrieveProfiles.mockClear();
                propsAfterCreateProfileError.actions.create.mockClear();
                propsAfterCreateProfileError.actions.addNotification.mockClear();
            });

            it('calls createProfile action with correct data when handleSubmit is called and name has been updated but an unknown error occurs', async () => {
                const profileNameInputEvent = Object.assign({}, mockEvent(), { target: { value: 'TEST_NEW_PROFILE' } });
                await wrapper.instance().handleProfileNameChange(profileNameInputEvent);
                await wrapper.instance().handleSubmit(mockEvent());

                await expect(propsAfterCreateProfileError.actions.create).toHaveBeenCalled();
                await expect(propsAfterCreateProfileError.actions.addNotification).toHaveBeenCalledWith({
                    message: 'oh-dear',
                    level: 'error',
                    title: 'Unknown Error'
                });
            });
        });
    });

    describe('Update Profile', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                updateProfile: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILE_UPDATE_SUCCESS',
                        success: { data: mockProfile }
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        users: mockUsers,
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Updated profile',
                    level: 'success',
                    title: 'success'
                },
                projects: mockProjects,
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveUsers.mockClear();
                propsWithControlCentreData.actions.retrieveProfiles.mockClear();
                propsWithControlCentreData.actions.updateProfile.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            it('calls handleProfileStatus when profile status is toggled when updating an existing profile', async () => {
                const profileActiveStatusToggleData = Object.assign({}, {
                    profile: mockProfile,
                    active: true
                });

                await wrapper.instance().handleProfileStatus(mockEvent(), profileActiveStatusToggleData);
                await expect(propsWithControlCentreData.actions.updateProfile).toHaveBeenCalledWith({
                    _id: '999879',
                    name: 'NEW_PROFILE',
                    active: true,
                    createdDate: 'aDate',
                    updatedDate: expect.any(Date)
                });

                await expect(propsWithControlCentreData.actions.addNotification).toHaveBeenCalledWith({
                    message: 'Updated profile',
                    level: 'success',
                    title: 'success'
                });

                await expect(propsWithControlCentreData.actions.retrieveUsers).toHaveBeenCalled();
                await expect(propsWithControlCentreData.actions.retrieveProfiles).toHaveBeenCalled();
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                updateProfile: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                ))
            });

            const propsAfterUpdateProfileError = Object.assign({}, props, {
                admin: {},
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsAfterUpdateProfileError} />);

                propsAfterUpdateProfileError.actions.retrieveUsers.mockClear();
                propsAfterUpdateProfileError.actions.retrieveProfiles.mockClear();
                propsAfterUpdateProfileError.actions.updateProfile.mockClear();
                propsAfterUpdateProfileError.actions.addNotification.mockClear();
            });

            it('calls handleProfileStatus when profile status is toggled when updating an existing profile and errors', async () => {
                const profileActiveStatusToggleData = Object.assign({}, {
                    profile: mockProfile,
                    active: true
                });

                await wrapper.instance().handleProfileStatus(mockEvent(), profileActiveStatusToggleData);
                await expect(propsAfterUpdateProfileError.actions.updateProfile).toHaveBeenCalled();
            });
        });
    });


    describe('Delete Profile', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                deleteProfile: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILE_DELETION_SUCCESS',
                        success: {
                            data: {}
                        }
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        users: mockUsers,
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Deleted profile',
                    level: 'success',
                    title: 'success'
                },
                actions: propsActions
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveUsers.mockClear();
                propsWithControlCentreData.actions.retrieveProfiles.mockClear();
                propsWithControlCentreData.actions.deleteProfile.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            it('calls handleDeleteProfile when delete profile is clicked and returns success', async () => {
                const handleDeleteProfileSpy = jest.spyOn(ControlCentre.prototype, 'fetchAllProfiles');

                await wrapper.instance().handleDeleteProfile(mockEvent(), { id: '999879' });
                await expect(propsWithControlCentreData.actions.deleteProfile).toHaveBeenCalledWith('999879');
                await expect(propsWithControlCentreData.actions.deleteProfile('999879')).resolves.toEqual({
                    type: 'PROFILE_DELETION_SUCCESS',
                    success: {
                        data: {}
                    }
                });
                await expect(handleDeleteProfileSpy).toHaveBeenCalled();
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                deleteProfile: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                ))
            });

            const propsAfterDeleteProfileError = Object.assign({}, props, {
                admin: {},
                actions: propsActions
            });

            beforeEach(() => {
                propsAfterDeleteProfileError.actions.retrieveUsers.mockClear();
                propsAfterDeleteProfileError.actions.retrieveProfiles.mockClear();
                propsAfterDeleteProfileError.actions.deleteProfile.mockClear();
                propsAfterDeleteProfileError.actions.addNotification.mockClear();

                wrapper = shallow(<ControlCentre {...propsAfterDeleteProfileError} />);
            });

            it('calls handleDeleteProfile when delete profile is clicked but returns an error', async () => {
                await wrapper.instance().handleDeleteProfile(mockEvent(), { id: '999870' });

                await expect(propsAfterDeleteProfileError.actions.deleteProfile).toHaveBeenCalledWith('999870');
                await expect(propsAfterDeleteProfileError.actions.addNotification).toHaveBeenCalledWith({
                    message: 'oh-dear',
                    level: 'error',
                    title: 'Unknown Error'
                });
            });
        });
    });

    describe('Assign Profile to Projects', () => {
        describe('success', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                listProjects: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROFILE_DELETION_SUCCESS',
                        success: {
                            data: mockProjects
                        }
                    })
                )),
                updateProject: jest.fn(() => (
                    Promise.resolve({
                        type: 'PROJECT_UPDATE_SUCCESS',
                        success: {
                            data: mockProjectWithProfileA
                        }
                    })
                ))
            });

            const propsWithControlCentreData = Object.assign({}, props, {
                admin: {
                    controlCentre: {
                        users: mockUsers,
                        profiles: mockProfiles
                    }
                },
                notification: {
                    message: 'Deleted profile',
                    level: 'success',
                    title: 'success'
                },
                actions: propsActions,
                projects: mockProjects
            });

            beforeEach(() => {
                wrapper = shallow(<ControlCentre {...propsWithControlCentreData} />);

                propsWithControlCentreData.actions.retrieveUsers.mockClear();
                propsWithControlCentreData.actions.listProjects.mockClear();
                propsWithControlCentreData.actions.retrieveProfiles.mockClear();
                propsWithControlCentreData.actions.updateProject.mockClear();
                propsWithControlCentreData.actions.deleteProfile.mockClear();
                propsWithControlCentreData.actions.addNotification.mockClear();
            });

            it('calls handleSubmitToAssignProjectsToProfile when submit form is clicked and returns success', async () => {
                const handleSubmitToAssignProjectsToProfileSpy = jest.spyOn(ControlCentre.prototype, 'fetchAllProfiles');

                await wrapper.instance().handleDropDownChange(mockEvent(), { value: 'PROFILE_B' });
                await wrapper.instance().handleProjectCheckboxChange(mockEvent(), { 'data-projcb': mockProjectWithProfileA });
                await wrapper.instance().handleSubmitToAssignProjectsToProfile(mockEvent());

                await expect(wrapper.state().profileNameToAssignProjects).toEqual('PROFILE_B');
                await expect(wrapper.state().projectsToAssignProfile).toEqual([
                    mockProjectWithProfileA
                ]);

                await expect(handleSubmitToAssignProjectsToProfileSpy).toHaveBeenCalled();

                const updatedProject = Object.assign({}, mockProject, {
                    profilesAssigned: ['PROFILE_A', 'PROFILE_B']
                });
                await expect(propsWithControlCentreData.actions.updateProject).toHaveBeenCalledWith(updatedProject);
            });
            it('calls handleDropDownChange when dropdown is changed', async () => {
                await wrapper.instance().handleDropDownChange(mockEvent(), { value: 'PROFILE_A' });
                await expect(wrapper.state().profileNameToAssignProjects).toEqual('PROFILE_A');
            });
        });
        describe('error', () => {
            let wrapper;

            const propsActions = Object.assign({}, props.actions, {
                listProjects: jest.fn(() => (
                    Promise.resolve({ error: 'oh-no' })
                ))
            });

            const propsAfterAssignProfileToProjectsProfileError = Object.assign({}, props, {
                admin: {},
                actions: propsActions,
                projects: null
            });

            beforeEach(() => {
                propsAfterAssignProfileToProjectsProfileError.actions.retrieveUsers.mockClear();
                propsAfterAssignProfileToProjectsProfileError.actions.retrieveProfiles.mockClear();
                propsAfterAssignProfileToProjectsProfileError.actions.deleteProfile.mockClear();
                propsAfterAssignProfileToProjectsProfileError.actions.addNotification.mockClear();

                wrapper = shallow(<ControlCentre {...propsAfterAssignProfileToProjectsProfileError} />);
            });

            it('calls handleSubmitToAssignProjectsToProfile when submit for clicked but returns without updating project if profile already assigned', async () => {
                const handleSubmitToAssignProjectsToProfileSpy = jest.spyOn(ControlCentre.prototype, 'fetchAllProfiles');

                await wrapper.instance().handleDropDownChange(mockEvent(), { value: 'PROFILE_A' });
                await wrapper.instance().handleProjectCheckboxChange(mockEvent(), { 'data-projcb': mockProjectWithProfileA });
                await wrapper.instance().handleSubmitToAssignProjectsToProfile(mockEvent());

                await expect(handleSubmitToAssignProjectsToProfileSpy).toHaveBeenCalled();

                await expect(propsAfterAssignProfileToProjectsProfileError.actions.updateProject)
                    .not.toHaveBeenCalled();
            });

            it('displays loading component when action to fetch projects is not complete or returns undefined', async () => {
                wrapper = shallow(<ControlCentre {...propsAfterAssignProfileToProjectsProfileError} />);
                expect(wrapper.props().projects).toBe(undefined);
                expect(wrapper.find(LoadingComponent).length).toEqual(1);
            });
        });
    });
});
