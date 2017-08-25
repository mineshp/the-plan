import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create, createdProject, errorCreatingProject } from '../../actions/project.js';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import ColourDropDown from '../../components/Shared/ColourDropDown.js';
import DisplayMessage from '../../components/Shared/DisplayMessage.js';

import './Project.css';

import { bindActionCreators } from 'redux';

class CreateProject extends Component {
  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this);

    this.state = { projects: null };
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
          <Container>
              {
                  (this.props.result.error || this.props.result.success) &&
                  <DisplayMessage status={this.props.result} />
              }
              <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                      <Input
                          placeholder='Project Name...'
                          className='text-box-custom'
                          defaultValue={this.props.projectName}
                          onChange={this.handleChange}
                          />
                  </Form.Field>
                  <Form.Field>
                      <ColourDropDown handleChange={this.handleDropDownSelection}/>
                  </Form.Field>
                  <Button color='teal' type='submit'>Create</Button>
              </Form>
          </Container>
      );
  }
}

function mapStateToProps(state) {
  return {
    result: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      createdProject, errorCreatingProject, create
    }, dispatch)
  };
}

CreateProject = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProject)

export default CreateProject;