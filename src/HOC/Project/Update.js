import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create, fetchSingleProject, update } from '../../actions/project';
import { retrieveProfiles } from '../../actions/controlCentre';
import { addNotification } from '../../actions/notification';
import UpdateProjectComponent from '../../components/Project/UpdateProject';
import LoadingComponent from '../../components/Shared/Loading';

import './Project.css';

const buildProjectData = (
    originalObject, { projectName, projectDescription, colour, profilesAssigned }) => Object.assign({}, {
    _id: originalObject._id, // eslint-disable-line no-underscore-dangle
    projectName: projectName || originalObject.projectName,
    projectDescription: projectDescription || originalObject.projectDescription,
    colour: colour ? colour.toLowerCase() : originalObject.colour,
    createdDate: new Date(),
    profilesAssigned: (profilesAssigned.length > 0) ? profilesAssigned : originalObject.profilesAssigned
});

class UpdateProject extends Component {
    constructor(props, context) {
        super(props, context);

        this.createOrUpdateProject = this.createOrUpdateProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownSelection = this.handleDropDownSelection.bind(this);
        this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(this);
        this.handleCheckboxSelectionForProfiles = this.handleCheckboxSelectionForProfiles.bind(this);
        this.state = {
            profilesAssigned: []
        };
    }

    async componentDidMount() {
        await this.props.actions.retrieveProfiles();
        if (this.props.match.params && this.props.match.params.id) {
            const projectId = this.props.match.params.id;
            await this.props.actions.fetchSingleProject(projectId);
        }
    }

    createOrUpdateProject() {
        if (this.props.result && this.props.result._id) { // eslint-disable-line no-underscore-dangle
            const projectObject = buildProjectData(this.props.result, this.state);
            this.props.actions.update(projectObject)
                .then((data) => {
                    const notification = this.props.notification
                        ? this.props.notification
                        : Object.assign({}, {
                            message: data.error,
                            level: 'error',
                            title: 'Unknown Error'
                        });
                    this.props.actions.addNotification(notification);
                    this.redirect();
                });
        } else {
            const { user } = this.props.authentication;
            const setupNewProject = Object.assign({}, this.state, { owner: user.username });
            this.props.actions.create(setupNewProject)
                .then((data) => {
                    const notification = this.props.notification
                        ? this.props.notification
                        : Object.assign({}, {
                            message: data.error,
                            level: 'error',
                            title: 'Unknown Error'
                        });
                    this.props.actions.addNotification(notification);
                    this.redirect();
                });
        }
    }

    handleChange(event) {
        this.setState({ projectName: event.target.value });
    }

    handleProjectDescriptionChange(event) {
        this.setState({ projectDescription: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createOrUpdateProject();
    }

    handleDropDownSelection(event, data) {
        event.preventDefault();
        this.setState({ colour: data.value });
    }

    handleCheckboxSelectionForProfiles(event, data) {
        let profilesAssignedCb = [...this.props.result.profilesAssigned, ...this.state.profilesAssigned];
        const profileToAdd = data['data-cb'];
        profilesAssignedCb = [...(new Set(profilesAssignedCb))];

        /* istanbul ignore else */
        if (data.checked && !profilesAssignedCb.includes(profileToAdd)) {
            profilesAssignedCb.push(profileToAdd);
            this.setState({
                profilesAssigned: [...profilesAssignedCb]
            });
        } else if (!data.checked && profilesAssignedCb.includes(profileToAdd)) {
            const index = profilesAssignedCb.indexOf(profileToAdd);
            profilesAssignedCb.splice(index, 1);
            this.setState({
                profilesAssigned: [...profilesAssignedCb]
            });
        }
    }

    redirect() {
        this.context.router.history.push('/project/all');
    }

    render() {
        const { admin, result } = this.props;

        return (
            // eslint-disable-next-line no-underscore-dangle
            !result || Array.isArray(result) || admin.controlCentre.profiles.length === 0
                ? <LoadingComponent />
                : <UpdateProjectComponent
                    result={result}
                    profiles={admin.controlCentre.profiles}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleDropDownSelection={this.handleDropDownSelection}
                    handleProjectDescriptionChange={this.handleProjectDescriptionChange}
                    handleCheckboxSelectionForProfiles={this.handleCheckboxSelectionForProfiles}
                    profilesAssigned={this.state.profilesAssigned}
                />
        );
    }
}

UpdateProject.propTypes = {
    actions: PropTypes.shape({
        create: PropTypes.func.isRequired,
        fetchSingleProject: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        retrieveProfiles: PropTypes.func.isRequired
    }).isRequired,
    authentication: PropTypes.shape({
        user: PropTypes.shape({})
    }).isRequired,
    result: PropTypes.shape({
        _id: PropTypes.string,
        profilesAssigned: PropTypes.arrayOf(PropTypes.string)
    }),
    admin: PropTypes.shape({}),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

UpdateProject.defaultProps = {
    match: null,
    result: null,
    notification: null,
    admin: null
};

// Pull in the React Router context so router is available on this.context.router
UpdateProject.contextTypes = {
    router: PropTypes.object
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state, ownProps) => {
    let project;
    const id = ownProps.match.params;

    if (Object.keys(id).length !== 0) {
        // PROJECT_LIST_RETRIEVED action
        if (state.projects.data) {
            project = state.projects.data;
        // PROJECT_UPDATE_SUCCESS action
        } else if (state.projects && state.projects.success && state.projects.success.data) {
            project = state.projects.success.data;
        }
    } else {
        // PROJECT_UPDATE_ERROR
        project = state.projects.error
            ? state.projects
            : Object.assign({}, { projectName: '', colour: '', projectDescription: '', profilesAssigned: [] });
    }

    return {
        result: project,
        admin: state.controlCentre,
        notification: state.projects.notification,
        authentication: state.authentication
    };
};

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            create, fetchSingleProject, update, addNotification, retrieveProfiles
        }, dispatch)
    }
);

const UpdateProjectConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProject);

export {
    UpdateProject,
    UpdateProjectConnectedComponent
};
