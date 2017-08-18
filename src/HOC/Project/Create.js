import React, { Component } from 'react';
import { connect } from 'react-redux';
import { create } from '../../actions/project.js';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import ColourDropDown from '../../components/Shared/ColourDropDown.js';
import './Project.css';


class CreateProject extends Component {
  constructor(props, context) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createProject = this.createProject.bind(this);
    this.handleDropDownSelection = this.handleDropDownSelection.bind(this);

    this.state = {
        projectName: '',
        colour: ''
    };
  }

  createProject() {
      console.log("CreateProject called")
  }

  componentDidMount() {
    // Subscribe to changes
    //DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    //DataSource.removeChangeListener(this.handleChange);
  }

  handleChange(event) {
    this.setState({projectName: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      this.props.dispatch(create(this.state));
      console.log(this.state);

      // CREATE
      return;
  }

  handleDropDownSelection(event, data) {
      event.preventDefault();
      this.setState({ colour: data.value });
  }

  render() {
      return (
          <Container>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                      <Input
                          placeholder='Project Name...'
                          className='text-box-custom'
                          defaultValue={this.state.projectName}
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

CreateProject = connect()(CreateProject)

export default CreateProject;