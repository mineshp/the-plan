import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProject, listProjects } from '../../actions/project';
import { addNotification } from '../../actions/notification';
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
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.fetchProjectsList();
            });
    }

    fetchProjectsList() {
        this.props.actions.listProjects()
            .then((data) => {
                const notification = this.props.notification
                    ? this.props.notification
                    : Object.assign({}, {
                        message: data.error,
                        level: 'error',
                        title: 'Unknown Error'
                    });
                this.props.actions.addNotification(notification);
            });
    }

    render() {
        const Cards = [];
        const { projects } = this.props;
        if (projects && projects.data) {
            projects.data.map((project) =>
                // eslint-disable-next-line no-underscore-dangle
                Cards.push(<ProjectCard data={project} key={project._id} onDeleteHandler={this.handleDelete} />));
        }

        return (
            <ListProjectsComponent
                cards={Cards}
                onDeleteHandler={this.handleDelete}
            />

        );
    }
}

ManageProject.propTypes = {
    actions: PropTypes.shape({
        deleteProject: PropTypes.func.isRequired,
        listProjects: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    projects: PropTypes.shape([]),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

ManageProject.defaultProps = {
    actions: null,
    projects: null,
    notification: null
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        projects: state.projects,
        notification: state.projects.notification
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            deleteProject, listProjects, addNotification
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
