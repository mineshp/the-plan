import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteList, retrieveSummaryLists, retrieveSummaryListsByProject } from '../../actions/list';
import { addNotification } from '../../actions/notification';
import ListsSummaryRow from '../../components/ListsSummary/ListRow';
import ListsSummaryComponent from '../../components/ListsSummary/ListsSummary';
import LoadingComponent from '../../components/Shared/Loading';

class ManageListSummary extends Component {
    constructor(props) {
        super(props);
        this.fetchLists = this.fetchLists.bind(this);
        this.deleteList = this.deleteList.bind(this);
    }

    componentDidMount() {
        this.fetchLists();
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

    fetchLists() {
        if (this.props.match.params && this.props.match.params.projectName) {
            const projectName = this.props.match.params.projectName;
            this.props.actions.retrieveSummaryListsByProject(projectName)
                .then(() => this.props.actions.addNotification(this.props.notification));
        } else {
            this.props.actions.retrieveSummaryLists()
                .then(() => this.props.actions.addNotification(this.props.notification));
        }
    }

    render() {
        const ListRow = [];
        const { lists } = this.props;
        const listSummaryParam = this.props.match.params && this.props.match.params.projectName
            ? this.props.match.params.projectName
            : 'all';

        if (lists && lists.data) {
            lists.data.map((list) =>
                // eslint-disable-next-line no-underscore-dangle
                ListRow.push(<ListsSummaryRow data={list} key={list._id} onDeleteHandler={this.deleteList} />));
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
        addNotification: PropTypes.func.isRequired
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
            deleteList, retrieveSummaryLists, retrieveSummaryListsByProject, addNotification
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

