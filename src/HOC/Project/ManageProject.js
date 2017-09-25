import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteProject, deletedProject, errorDeletingProject } from '../../actions/project';
import ProjectCard from '../../components/Project/ProjectCard';
import ListProjectsComponent from '../../components/Project/ListProjects';

import { bindActionCreators } from 'redux';

class ManageProject extends Component {
    constructor(props, context) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { projects: [], apiError: null };
    }

    componentDidMount() {
        return fetch('/project/all')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(
                    new Error('Unable to retrieve projects, please try again later.'));
            })
            .then((projects) => {
                this.setState({ projects })
            })
            .catch(err => {
                // console.error(err);
                const displayError = {
                    error: {
                        message: err.message,
                        isError: true
                    }
                };

                this.setState({
                    apiError: displayError
                });
            });
    }

    handleDelete(event) {
        event.preventDefault();
        const projectIdToDelete = event.target.value;
        this.props.actions.deleteProject(projectIdToDelete);
        return;
    }

    render() {
        let Cards = [];
        this.state.projects.map((project) => {
            return Cards.push(<ProjectCard data={project} key={project._id} onDeleteHandler={this.handleDelete} />);
        });

        const result = this.state.apiError ? this.state.apiError : this.props.result;

        return (
            <ListProjectsComponent
                result={result}
                cards={Cards}
                onDeleteHandler={this.handleDelete}>
            </ListProjectsComponent>

        )
    }
}

// TODO: Change to use es6 function
function mapStateToProps(state) {
    return {
        result: state.projects
    };
}

// TODO: Change to use es6 function
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      deletedProject, errorDeletingProject, deleteProject
    }, dispatch)
  };
}

const ManageProjectConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageProject)

export {
    ManageProject,
    ManageProjectConnectedComponent
};