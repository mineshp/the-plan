import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create, createdProject, errorCreatingProject } from '../../actions/project';
import CreateProjectComponent from '../../components/Project/CreateProject';

import './Project.css';

class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropDownSelection = this.handleDropDownSelection.bind(this);

        this.state = { projects: null, shouldRedirect: false };
    }

    handleChange(event) {
        this.setState({ projectName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.actions.create(this.state);
    }

    handleDropDownSelection(event, data) {
        event.preventDefault();
        this.setState({ colour: data.value });
    }

    render() {
        return (
            <CreateProjectComponent
                result={this.props.result}
                handleChange={this.handleChange}
                handleDropDownSelection={this.handleDropDownSelection}
                handleSubmit={this.handleSubmit}
                projectName={this.props.projectName}
            />
        );
    }
}

CreateProject.propTypes = {
    actions: PropTypes.shape({
        create: PropTypes.func.isRequired
    }).isRequired,
    result: PropTypes.shape({}).isRequired,
    projectName: PropTypes.string
};

CreateProject.defaultProps = {
    projectName: null
};

function mapStateToProps(state) {
    return {
        result: state.projects
    //   shouldRedirect: state.projects.shouldRedirect
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createdProject, errorCreatingProject, create
        }, dispatch)
    };
}

const CreateProjectConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProject);

export {
    CreateProject,
    CreateProjectConnectedComponent
};
