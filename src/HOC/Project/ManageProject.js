import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject, listProjects } from '../../actions/project';
import ProjectCard from '../../components/Project/ProjectCard';
import ListProjectsComponent from '../../components/Project/ListProjects';

class ManageProject extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchProjectsList = this.fetchProjectsList.bind(this);
    }

    componentDidMount() {
        this.fetchProjectsList();
    }

    handleDelete(event) {
        event.preventDefault();
        const projectIdToDelete = event.target.value;
        this.props.actions.deleteProject(projectIdToDelete)
            .then((deleteStatus) => {
                if (deleteStatus && deleteStatus.type === 'PROJECT_DELETION_SUCCESS') {
                    this.fetchProjectsList();
                }
            });
    }

    fetchProjectsList() {
        this.props.actions.listProjects();
    }

    render() {
        const Cards = [];
        const { projects } = this.props;
        if (projects && projects.data) {
            projects.data.map((project) =>
                // eslint-disable-next-line no-underscore-dangle
                Cards.push(<ProjectCard data={project} key={project._id} onDeleteHandler={this.handleDelete} />));
        }

        let projectErrors;
        if (projects && projects.error) {
            projectErrors = projects.error;
        }

        return (
            <ListProjectsComponent
                errors={projectErrors}
                cards={Cards}
                onDeleteHandler={this.handleDelete}
            />

        );
    }
}

ManageProject.propTypes = {
    actions: PropTypes.shape({
        deleteProject: PropTypes.func,
        listProjects: PropTypes.func
    }),
    projects: PropTypes.shape([])
};

ManageProject.defaultProps = {
    actions: null,
    projects: null // TODO: Change to ARRAY
};

const mapStateToProps = (state) => (
    { projects: state.projects }
);

const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            deleteProject, listProjects
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
