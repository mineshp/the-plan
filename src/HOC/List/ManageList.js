import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'
import { Table } from 'semantic-ui-react';
import Row from '../../components/List/ListRow';
import DisplayMessage from '../../components/Shared/DisplayMessage';


class ManageList extends Component {
    state = {
        lists: [],
        notification: null
    }

    componentDidMount() {
        return fetch('/list/all')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(
                    new Error('Unable to retrieve lists, please try again later.'));
            })
            .then((lists) => {
                this.setState({ lists })
            })
            .catch(err => {
                // console.error(err);
                const displayError = {
                    error: {
                        message: err.message,
                        isError: true
                    }
                };
                this.setState({
                    notification: displayError
                });
            });
    }

    render() {
        let ListRow = [];
        this.state.lists.map((list) => {
            return ListRow.push(<Row data={list} key={list._id} />);
        });

        return (
            <div className="List main">
                {
                    this.state.notification &&
                        <DisplayMessage status={this.state.notification} />
                }
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell>Last Updated</Table.HeaderCell>
                            <Table.HeaderCell>Projects</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {ListRow}
                    </Table.Body>
                </Table>
            </div>
        )
    }
};
//ManageList = connect()(ManageList)

export default ManageList