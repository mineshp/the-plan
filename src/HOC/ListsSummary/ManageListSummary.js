import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveSummaryLists } from '../../actions/list';
import { addNotification } from '../../actions/notification';
import ListsSummaryRow from '../../components/ListsSummary/ListRow';
import ListsSummaryComponent from '../../components/ListsSummary/ListsSummary';

class ManageListSummary extends Component {
    constructor(props) {
        super(props);
        this.fetchLists = this.fetchLists.bind(this);
    }

    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
        this.props.actions.retrieveSummaryLists()
            .then(() => this.props.actions.addNotification(this.props.notification));
    }

    render() {
        const ListRow = [];
        const { lists } = this.props;
        if (lists && lists.data) {
            lists.data.map((list) =>
                // eslint-disable-next-line no-underscore-dangle
                ListRow.push(<ListsSummaryRow data={list} key={list._id} />));
        }

        return (
            <ListsSummaryComponent
                rows={ListRow}
            />
        );
    }
}

ManageListSummary.propTypes = {
    actions: PropTypes.shape({
        retrieveSummaryLists: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    lists: PropTypes.shape([]),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

ManageListSummary.defaultProps = {
    actions: null,
    lists: null,
    notification: null
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
            retrieveSummaryLists, addNotification
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

