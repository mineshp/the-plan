import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'
import { Table } from 'semantic-ui-react';
import Row from '../../components/List/ListRow';

class ManageList extends Component {
    state = { lists: [] }

    componentDidMount() {
        fetch('/list/all')
            .then(res => res.json())
            .then((lists) => {
                this.setState({ lists })
            })
            .catch(function (err) {
                console.log("ERR", err)
            });
    }

    render() {
        let ListRow = [];
        this.state.lists.map((list) => {
            return ListRow.push(<Row data={list} key={list._id} />);
        });
        return (
            <div className="List main">
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