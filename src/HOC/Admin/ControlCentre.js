import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    deleteUser,
    retrieveUsers,
    create,
    update as updateProfile,
    updateUser,
    deleteProfile,
    retrieveProfiles
} from '../../actions/controlCentre';
import { listAllProjects, update as updateProject } from '../../actions/project';
import { addNotification } from '../../actions/notification';
import ControlCentreComponent from '../../components/Admin/ControlCentre';
import LoadingComponent from '../../components/Shared/Loading';

const buildProfileData = (originalObject, active) => (
    Object.assign({}, {
        _id: originalObject._id, // eslint-disable-line no-underscore-dangle
        name: originalObject.name,
        active,
        createdDate: originalObject.createdDate,
        updatedDate: new Date()
    })
);

class ControlCentre extends Component {
    constructor(props) {
        super(props);
        this.fetchAllUsers = this.fetchAllUsers.bind(this);
        this.handleResetPwd = this.handleResetPwd.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleProfileNameChange = this.handleProfileNameChange.bind(this);
        this.handleProfileActiveChange = this.handleProfileActiveChange.bind(this);
        this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
        this.handleProfileStatus = this.handleProfileStatus.bind(this);
        this.handleDropDownChange = this.handleDropDownChange.bind(this);
        this.handleUsersDropDownChange = this.handleUsersDropDownChange.bind(this);
        this.handleSubmitToAssignUsersToProfile = this.handleSubmitToAssignUsersToProfile.bind(this);
        this.handleSubmitToAssignProjectsToProfile = this.handleSubmitToAssignProjectsToProfile.bind(this);
        this.handleManageProfilesAccordionClick =
            this.handleManageProfilesAccordionClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProjectCheckboxChange = this.handleProjectCheckboxChange.bind(this);
        this.handleProfilesCheckboxChange = this.handleProfilesCheckboxChange.bind(this);
        this.createProfile = this.createProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.state = {
            activeIndex: 0,
            active: false,
            name: null,
            profileNameToAssignProjects: null,
            usernameToAssignProfiles: null,
            projectsToAssignProfile: [],
            profilesToAssignUser: [],
            userProfilesAssigned: []
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    fetchData() {
        this.retrieveProjects();
        this.fetchAllUsers();
        this.fetchAllProfiles();
    }

    async updateProfile(profile, activeStatus) {
        const updateProfileObj = buildProfileData(profile, activeStatus);
        await this.props.actions.updateProfile(updateProfileObj)
            .then(() => {
                this.setState({
                    activeIndex: 0
                });
                this.fetchData();
            });
    }

    fetchUser() {
        return this.props.admin.controlCentre.users.filter(
            (user) => user.username === this.state.usernameToAssignProfiles)[0];
    }

    async updateUser() {
        const existingUser = Object.assign({}, this.fetchUser());
        const { userProfilesAssigned } = this.state;

        /* istanbul ignore else  */
        if (existingUser && !existingUser.profile.includes(userProfilesAssigned)) {
            existingUser.profile = [...userProfilesAssigned];

            this.props.actions.updateUser(existingUser)
                .then(() => {
                    this.setState({
                        activeIndex: 0
                    });
                    this.fetchData();
                });
        }
    }

    async updateProject(project) {
        const { profileNameToAssignProjects } = this.state;

        if (project.profilesAssigned && !project.profilesAssigned.includes(profileNameToAssignProjects)) {
            project.profilesAssigned.push(profileNameToAssignProjects);
            await this.props.actions.updateProject(project);
            this.fetchData();
        }
    }

    async createProfile() {
        const setupNewProfile = Object.assign({}, this.state);
        this.props.actions.create(setupNewProfile)
            .then((data) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: data.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });
                this.props.actions.addNotification(notification);
                this.setState({
                    activeIndex: 0
                });
                this.fetchData();
            });
    }

    handleProfileNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleDropDownChange(event, data) {
        this.setState({ profileNameToAssignProjects: data.value });
    }

    async fetchProfilesAlreadyAssignedToUser() {
        const user = await this.fetchUser();
        if (user) {
            await this.setState({ userProfilesAssigned: [...user.profile] });
        }
    }

    async handleUsersDropDownChange(event, data) {
        await this.setState({ usernameToAssignProfiles: data.value });
        await this.fetchProfilesAlreadyAssignedToUser();
    }

    handleProfileActiveChange() {
        this.setState({ active: !this.state.active });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.createProfile();
    }

    async handleSubmitToAssignUsersToProfile(event) {
        event.preventDefault();
        await this.updateUser();
    }

    handleProjectCheckboxChange(event, data) {
        this.setState({
            projectsToAssignProfile: [...this.state.projectsToAssignProfile, data['data-projcb']]
        });
    }

    handleProfilesCheckboxChange(event, data) {
        const checkedProfiles = this.state.userProfilesAssigned;

        /* istanbul ignore else  */
        if (data.checked && !checkedProfiles.includes(data['data-cb'])) {
            checkedProfiles.push(data['data-cb']);
        } else if (!data.checked && checkedProfiles.includes(data['data-cb'])) {
            const index = checkedProfiles.indexOf(data['data-cb']);
            checkedProfiles.splice(index, 1);
        }

        this.setState({
            userProfilesAssigned: checkedProfiles
        });
    }

    async handleSubmitToAssignProjectsToProfile(event) {
        event.preventDefault();
        this.state.projectsToAssignProfile.map((project) => this.updateProject(project));
    }

    retrieveProjects() {
        this.props.actions.listAllProjects();
    }

    async fetchAllUsers() {
        await this.props.actions.retrieveUsers()
            .then((data) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: data.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });

                this.props.actions.addNotification(notification);
            });
    }

    async fetchAllProfiles() {
        await this.props.actions.retrieveProfiles()
            .then((data) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: data.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });

                this.props.actions.addNotification(notification);
            });
    }

    handleManageProfilesAccordionClick(event, index) {
        event.preventDefault();
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    async handleDeleteProfile(event, data) {
        event.preventDefault();
        await this.props.actions.deleteProfile(data.id)
            .then((deleteProfileData) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: deleteProfileData.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });
                this.props.actions.addNotification(notification);
                this.fetchAllProfiles();
            });
    }

    // eslint-disable-next-line class-methods-use-this
    handleResetPwd(event, data) {
        // console.log('reset pwd for id', data.id);
    }

    async handleDeleteUser(event, data) {
        event.preventDefault();
        await this.props.actions.deleteUser(data.id)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.fetchAllUsers();
            });
    }

    async handleProfileStatus(event, data) {
        event.preventDefault();
        this.updateProfile(data.profile, data.active);
    }

    render() {
        const { admin, projects } = this.props;
        return (
            (!admin.controlCentre || !admin.controlCentre.users || !projects)
                ? <LoadingComponent />
                : <ControlCentreComponent
                    handleResetPwd={this.handleResetPwd}
                    handleDeleteUser={this.handleDeleteUser}
                    handleDeleteProfile={this.handleDeleteProfile}
                    handleProfileStatus={this.handleProfileStatus}
                    handleManageProfilesAccordionClick={this.handleManageProfilesAccordionClick}
                    handleProfileNameChange={this.handleProfileNameChange}
                    handleProfileActiveChange={this.handleProfileActiveChange}
                    handleDropDownChange={this.handleDropDownChange}
                    handleSubmitToAssignProjectsToProfile={this.handleSubmitToAssignProjectsToProfile}
                    handleProjectCheckboxChange={this.handleProjectCheckboxChange}
                    handleUsersDropDownChange={this.handleUsersDropDownChange}
                    handleSubmitToAssignUsersToProfile={this.handleSubmitToAssignUsersToProfile}
                    handleProfilesCheckboxChange={this.handleProfilesCheckboxChange}
                    handleSubmit={this.handleSubmit}
                    activeIndex={this.state.activeIndex}
                    users={admin.controlCentre.users}
                    profiles={admin.controlCentre.profiles}
                    projects={projects}
                    name={this.props.name}
                    active={this.props.active}
                    userProfilesAssigned={this.state.userProfilesAssigned}
                />
        );
    }
}

ControlCentre.propTypes = {
    actions: PropTypes.shape({
        retrieveUsers: PropTypes.func.isRequired,
        deleteUser: PropTypes.func.isRequired,
        create: PropTypes.func.isRequired,
        updateProfile: PropTypes.func.isRequired,
        retrieveProfiles: PropTypes.func.isRequired,
        deleteProfile: PropTypes.func.isRequired,
        listAllProjects: PropTypes.func.isRequired,
        updateProject: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    projects: PropTypes.arrayOf(PropTypes.shape({})),
    admin: PropTypes.shape({
        controlCentre: PropTypes.shape({
            users: PropTypes.arrayOf(PropTypes.shape({}))
        })
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    }),
    name: PropTypes.string,
    active: PropTypes.bool
};

ControlCentre.defaultProps = {
    actions: null,
    projects: null,
    notification: null,
    admin: null,
    name: null,
    active: null
};

ControlCentre.contextTypes = {
    router: PropTypes.object
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        admin: state.controlCentre,
        notification: state.controlCentre.notification,
        projects: state.projects.data
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            retrieveUsers,
            deleteUser,
            addNotification,
            create,
            updateProfile,
            retrieveProfiles,
            deleteProfile,
            listAllProjects,
            updateProject,
            updateUser
        }, dispatch)
    }
);

const ControlCentreConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlCentre);

export {
    ControlCentre,
    ControlCentreConnectedComponent
};
