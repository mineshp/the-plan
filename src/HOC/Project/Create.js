import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create, createdProject, errorCreatingProject } from '../../actions/project.js';
import CreateProjectComponent from '../../components/Project/CreateProject';

import './Project.css';

import { bindActionCreators } from 'redux';

class CreateProject extends Component {
  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this);

    this.state = { projects: null, shouldRedirect: false };
  }

  handleChange(event) {
    this.setState({projectName: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      this.props.actions.create(this.state);
      return;
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
              projectName={this.props.projectName}>
          </CreateProjectComponent>
      );
  }
}

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
)(CreateProject)

export {
    CreateProject,
    CreateProjectConnectedComponent,
    mapStateToProps
};