import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create, createdProject, errorCreatingProject } from '../../actions/project';
import CreateProjectComponent from '../../components/Project/CreateProject';

import './Project.css';

class CreateProject extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownSelection = this.handleDropDownSelection.bind(this);

        this.state = { projects: null };
    }

    handleChange(event) {
        this.setState({ projectName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.create(this.state)
            .then((projectCreated) => {
                if (projectCreated && projectCreated.type === 'PROJECT_CREATION_SUCCESS') {
                    this.redirect();
                }
            });
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
            <CreateProjectComponent
                result={this.props.result}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleDropDownSelection={this.handleDropDownSelection}
                projectName={this.props.projectName}
            />
        );
    }
}

CreateProject.propTypes = {
    actions: PropTypes.shape({
        create: PropTypes.func.isRequired
    }).isRequired,
    result: PropTypes.shape({
        success: PropTypes.shape({})
    }).isRequired,
    projectName: PropTypes.string
};

CreateProject.defaultProps = {
    projectName: null
};

// Pull in the React Router context so router is available on this.context.router
CreateProject.contextTypes = {
    router: PropTypes.object
};

const mapStateToProps = (state) => (
    { result: state.projects }
);

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            createdProject, errorCreatingProject, create
        }, dispatch)
    }
);

const CreateProjectConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProject);

export {
    CreateProject,
    CreateProjectConnectedComponent
};
