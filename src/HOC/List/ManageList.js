import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveListById } from '../../actions/list';
import { addNotification } from '../../actions/notification';
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
        this.props.actions.retrieveListById(listId)
            .then(() => this.props.actions.addNotification(this.props.notification));
    }

    render() {
        const { lists } = this.props;

        return (
            !lists
                ? <p>Loading Data...</p>
                : <List
                    list={lists.data}
                />
        );
    }
}

ManageList.propTypes = {
    actions: PropTypes.shape({
        retrieveListById: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired
    }),
    lists: PropTypes.shape([]),
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string
        })
    }),
    notification: PropTypes.shape({
        message: PropTypes.string,
        level: PropTypes.string,
        title: PropTypes.string
    })
};

ManageList.defaultProps = {
    actions: null,
    match: null,
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
            retrieveListById, addNotification
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

