import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux'
//import { addTodo } from '../actions'
import { Header, Table } from 'semantic-ui-react';
import Row from '../../components/List/ItemRow';

class View extends Component {
    constructor(props) {
        super(props);
        //this.handleChange = this.handleChange.bind(this);
        this.state = {
            listID: props.listID,
            list: {
                items: [],
                headings: []
            }
            //list: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        fetch(`/list/${this.state.listID}/view`)
            .then(res => res.json())
            .then(list => this.setState({ list }));
    }

    render() {
        let ItemRow = [];
        const headings = this.state.list.headings;
        const items = this.state.list.items;
        items.map((item) => {
            return ItemRow.push(<Row data={item} key={item.id} listID={this.state.list._id} />);
        });

        let ItemHeadings = [];
        headings.map((heading) => {
            return ItemHeadings.push(
                <Table.HeaderCell key={heading.id}>
                    {heading.name}
                </Table.HeaderCell>
            );
        });

        return (
            <div className="List main">
                <Header as='h3' floated='left' dividing>
                    {this.state.list.listName}
                </Header>
                <Table celled striped>
                    <Table.Header>
                        <Table.Row>
                            {ItemHeadings}
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {ItemRow}
                    </Table.Body>
                </Table>
            </div>
        )
    }
};

View.propTypes = {
  id: PropTypes.string
};

View.defaultProps = {
  id: '1'
};

// //ManageList = connect()(ManageList)

export default View