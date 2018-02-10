import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create, fetchSingleProject, update } from '../../actions/project';
import { addNotification } from '../../actions/notification';
import UpdateProjectComponent from '../../components/Project/UpdateProject';
import LoadingComponent from '../../components/Shared/Loading';

import './Project.css';

const buildProjectData = (originalObject, { projectName, colour }) => (
    Object.assign({}, {
        _id: originalObject._id, // eslint-disable-line no-underscore-dangle
        projectName: projectName || originalObject.projectName,
        colour: colour ? colour.toLowerCase() : originalObject.colour,
        createdDate: new Date()
    })
);

class UpdateProject extends Component {
    constructor(props, context) {
        super(props, context);

        this.createOrUpdateProject = this.createOrUpdateProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownSelection = this.handleDropDownSelection.bind(this);
    }

    componentWillMount() {
        if (this.props.match.params && this.props.match.params.id) {
            const projectId = this.props.match.params.id;
            this.props.actions.fetchSingleProject(projectId);
        }
    }

    createOrUpdateProject() {
        if (this.props.result && this.props.result._id) { // eslint-disable-line no-underscore-dangle
            const projectObject = buildProjectData(this.props.result, this.state || {});
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
            this.props.actions.create(this.state)
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

    handleSubmit(event) {
        event.preventDefault();

        this.createOrUpdateProject();
    }

    handleDropDownSelection(event, data) {
        event.preventDefault();
        this.setState({ colour: data.value });
    }

    redirect() {
        this.context.router.history.push('/project/all');
    }

    render() {
        return (
            !this.props.result
                ? <LoadingComponent />
                : <UpdateProjectComponent
                    result={this.props.result}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleDropDownSelection={this.handleDropDownSelection}
                    projectName={this.props.projectName}
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
    }).isRequired,
    result: PropTypes.shape({
        _id: PropTypes.string
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    }),
    projectName: PropTypes.string,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

UpdateProject.defaultProps = {
    projectName: null,
    match: null,
    result: null,
    notification: null
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
            : Object.assign({}, { projectName: '', colour: '' });
    }

    return {
        result: project,
        notification: state.projects.notification
    };
};

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            create, fetchSingleProject, update, addNotification
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
