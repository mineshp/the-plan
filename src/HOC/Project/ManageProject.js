import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject, deletedProject, errorDeletingProject } from '../../actions/project';
import ProjectCard from '../../components/Project/ProjectCard';
import ListProjectsComponent from '../../components/Project/ListProjects';

class ManageProject extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = { projects: [], apiError: null };
    }

    componentDidMount() {
        return fetch('/project/all')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve projects, please try again later.'));
            })
            .then((projects) => {
                this.setState({ projects });
            })
            .catch((err) => {
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
    }

    render() {
        const Cards = [];
        this.state.projects.map((project) =>
            // eslint-disable-next-line no-underscore-dangle
            Cards.push(<ProjectCard data={project} key={project._id} onDeleteHandler={this.handleDelete} />));

        const result = this.state.apiError ? this.state.apiError : this.props.result;

        return (
            <ListProjectsComponent
                result={result}
                cards={Cards}
                onDeleteHandler={this.handleDelete}
            />

        );
    }
}

ManageProject.propTypes = {
    actions: PropTypes.shape({
        deleteProject: PropTypes.func
    }),
    result: PropTypes.shape({})
};

ManageProject.defaultProps = {
    actions: null,
    result: null
};

const mapStateToProps = (state) => (
    { result: state.projects }
);

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            deletedProject, errorDeletingProject, deleteProject
        }, dispatch)
    }
);

const ManageProjectConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageProject);

export {
    ManageProject,
    ManageProjectConnectedComponent
};
