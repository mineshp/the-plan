import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteList, retrieveSummaryLists, retrieveSummaryListsByProject, update } from '../../actions/list';
import Auth from '../Authentication/Auth';
import { listProjects } from '../../actions/project';
import { addNotification } from '../../actions/notification';
import ListsSummaryRow from '../../components/ListsSummary/ListRow';
import ListsSummaryComponent from '../../components/ListsSummary/ListsSummary';
import LoadingComponent from '../../components/Shared/Loading';

const auth = new Auth();

class ManageListSummary extends Component {
    constructor(props, context) {
        super(props, context);
        this.fetchLists = this.fetchLists.bind(this);
        this.deleteList = this.deleteList.bind(this);
        this.markListAsComplete = this.markListAsComplete.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    async componentDidMount() {
        await this.fetchLists();
    }

    async getProjectsByProfilesSelected() {
        const profiles = auth.getProfilesToDisplay();
        const projectsObjects = await this.props.actions.listProjects(profiles);
        return projectsObjects.data.map((project) => project.projectName);
    }

    async markListAsComplete(event, data) {
        event.preventDefault();
        const listToReplaceIndex =
            this.props.lists.data.findIndex((list) => list._id === data.id); // eslint-disable-line no-underscore-dangle
        const listsClone = Object.assign([], this.props.lists.data);
        const listToUpdate = listsClone[listToReplaceIndex];

        const updatedList = Object.assign({}, listToUpdate, { completed: !listToUpdate.completed });
        return this.props.actions.update(updatedList)
            .then(() => {
                this.fetchLists();
                this.props.actions.addNotification(this.props.notification);
            });
    }

    deleteList(event) {
        event.preventDefault();
        const listIdToDelete = event.target.value;
        this.props.actions.deleteList(listIdToDelete)
            .then(() => {
                this.props.actions.addNotification(this.props.notification);
                this.fetchLists();
            });
    }

    async fetchLists() {
        if (this.props.match.params && this.props.match.params.projectName) {
            const projectName = this.props.match.params.projectName;
            this.props.actions.retrieveSummaryListsByProject(projectName)
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
        } else {
            const projects = await this.getProjectsByProfilesSelected();
            this.props.actions.retrieveSummaryLists(projects)
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
    }

    handleBtnClick(event, data) {
        this.context.router.history.push(data.value);
    }

    render() {
        const ListRow = [];
        const { lists } = this.props;
        const listSummaryParam = this.props.match.params && this.props.match.params.projectName
            ? this.props.match.params.projectName
            : 'all';

        if (lists && lists.data && lists.data.length > 0) {
            lists.data.map((list) =>
                ListRow.push(
                    <ListsSummaryRow
                        data={list}
                        key={list._id} // eslint-disable-line no-underscore-dangle
                        onDeleteHandler={this.deleteList}
                        onBtnClickHandler={this.handleBtnClick}
                        handleCompleted={this.markListAsComplete}
                    />
                ));
        }

        return (
            !lists.data
                ? <LoadingComponent />
                : <ListsSummaryComponent
                    rows={ListRow}
                    retrieveListBy={listSummaryParam}
                />
        );
    }
}

ManageListSummary.propTypes = {
    actions: PropTypes.shape({
        deleteList: PropTypes.func.isRequired,
        retrieveSummaryLists: PropTypes.func.isRequired,
        retrieveSummaryListsByProject: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired,
        listProjects: PropTypes.func.isRequired
    }),
    lists: PropTypes.shape([]),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({
            projectName: PropTypes.string
        })
    })
};

ManageListSummary.defaultProps = {
    actions: null,
    lists: null,
    notification: null,
    match: null
};

ManageListSummary.contextTypes = {
    router: PropTypes.object
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    {
        lists: state.lists,
        notification: state.lists.notification
    }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            deleteList,
            retrieveSummaryLists,
            retrieveSummaryListsByProject,
            addNotification,
            update,
            listProjects
        }, dispatch)
    }
);

const ManageListSummaryConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageListSummary);

export {
    ManageListSummary,
    ManageListSummaryConnectedComponent
};

