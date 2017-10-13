import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveListById } from '../../actions/list';
import List from '../../components/List/List';


class ManageList extends Component {
    constructor(props) {
        super(props);
        this.fetchListById = this.fetchListById.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.id) {
            this.fetchListById(this.props.match.params.id);
        }
    }

    fetchListById(listId) {
        this.props.actions.retrieveListById(listId);
    }

    render() {
        const { lists } = this.props;

        let singleListErrors;
        if (lists && lists.error) {
            singleListErrors = lists;
        }

        return (
            !this.props.lists
                ? <p>Loading Data...</p>
                : <List
                    errors={singleListErrors}
                    list={this.props.lists.data}
                />
        );
    }
}

ManageList.propTypes = {
    actions: PropTypes.shape({
        retrieveListById: PropTypes.func
    }),
    lists: PropTypes.shape([]),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    })
};

ManageList.defaultProps = {
    actions: null,
    match: null,
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
            retrieveListById
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

