import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveListById, update } from '../../actions/list';
import { addNotification } from '../../actions/notification';
import List from '../../components/List/List';
import { buildListData } from '../../helpers/validators/list';

class ManageList extends Component {
    constructor(props) {
        super(props);
        this.fetchListById = this.fetchListById.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        if (this.props.match.params && this.props.match.params.id) {
            this.fetchListById(this.props.match.params.id);
        }
    }

    fetchListById(listId) {
        this.props.actions.retrieveListById(listId)
            .then((listRetrieved) => {
                /* istanbul ignore else */
                if (listRetrieved.type === 'LIST_RETRIEVED') {
                    const itemRowsClone = Object.assign([], listRetrieved.data.items);
                    this.setState({
                        items: itemRowsClone
                    });
                    this.props.actions.addNotification(this.props.notification);
                }
            });
    }

    addItem() {
        const newItemRowsClone = Object.assign([], this.state.items);
        const columns = [];
        this.props.lists.data.headings.map((heading) => (
            columns.push({
                columnName: heading.name,
                columnValue: 'edit'
            })
        ));

        newItemRowsClone.push({
            rowId: uuidv4(),
            columns
        });

        this.setState({
            items: newItemRowsClone
        });
    }

    handleChange(event, data) {
        if (!event.target.value || event.target.value === '' || event.target.value === 'Change me ...') {
            return;
        }

        const rowToReplaceIndex = this.state.items.findIndex((row) => row.rowId === data.id);
        const itemsClone = Object.assign([], this.state.items);
        const rowToUpdate = itemsClone[rowToReplaceIndex];
        const columnToReplaceIndex = rowToUpdate.columns.findIndex((item) => item.columnName === data.name);

        rowToUpdate.columns[columnToReplaceIndex].columnValue = event.target.value;

        this.setState({
            items: itemsClone
        });
    }

    async handleDelete(event, data) {
        event.preventDefault();
        const rowToReplaceIndex = this.state.items.findIndex((row) => row.rowId === data.id);
        const itemsClone = Object.assign([], this.state.items);
        itemsClone.splice(rowToReplaceIndex, 1);
        // Ensure we wait and setState before calling updateList
        await this.setState({
            items: itemsClone
        });
        this.updateList();
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateList();
    }

    updateList() {
        const listObject = buildListData(this.props.lists.data, this.state);
        this.props.actions.update(listObject)
            .then(() => {
                this.props.actions.retrieveListById(listObject._id); // eslint-disable-line no-underscore-dangle
                this.props.actions.addNotification(this.props.notification);
            });
    }

    render() {
        const { lists } = this.props;
        return (
            !lists
                ? <p>Loading Data...</p>
                : <List
                    list={lists.data} // TODO: Why is it lists.data and not lists, check actions/reducers
                    items={this.state.items}
                    handleAddItem={this.addItem}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                />
        );
    }
}

ManageList.propTypes = {
    actions: PropTypes.shape({
        retrieveListById: PropTypes.func.isRequired,
        addNotification: PropTypes.func.isRequired,
        update: PropTypes.func.isRequired
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
    items: [],
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
            retrieveListById, addNotification, update
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

