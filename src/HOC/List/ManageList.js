import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveSummaryLists } from '../../actions/list';
import Row from '../../components/List/ListRow';
import ListsComponent from '../../components/List/List';

class ManageList extends Component {
    constructor(props) {
        super(props);
        this.fetchLists = this.fetchLists.bind(this);
    }

    componentDidMount() {
        this.fetchLists();
    }

    fetchLists() {
        this.props.actions.retrieveSummaryLists();
    }

    render() {
        const ListRow = [];
        const { lists } = this.props;
        if (lists && lists.data) {
            lists.data.map((list) =>
                // eslint-disable-next-line no-underscore-dangle
                ListRow.push(<Row data={list} key={list._id} />));
        }

        let listErrors;
        if (lists && lists.error) {
            listErrors = lists.error;
        }

        return (
            <ListsComponent
                errors={listErrors}
                rows={ListRow}
            />
        );
    }
}

ManageList.propTypes = {
    actions: PropTypes.shape({
        retrieveSummaryLists: PropTypes.func
    }),
    lists: PropTypes.shape([])
};

ManageList.defaultProps = {
    actions: null,
    lists: null
};

/* istanbul ignore next: not testing mapStateToProps */
const mapStateToProps = (state) => (
    { lists: state.lists }
);

/* istanbul ignore next: not testing mapDispatchToProps */
const mapDispatchToProps = (dispatch) => (
    {
        actions: bindActionCreators({
            retrieveSummaryLists
        }, dispatch)
    }
);

const ManageListConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageList);

export {
    ManageList,
    ManageListConnectedComponent
};

