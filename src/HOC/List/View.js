import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Table } from 'semantic-ui-react';
import Row from '../../components/List/ItemRow';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listID: props.listID,
            list: {
                items: [],
                headings: []
            }
        };
    }

    componentDidMount() {
        fetch(`/list/${this.state.listID}/view`)
            .then((res) => res.json())
            .then((list) => this.setState({ list }));
    }

    render() {
        const ItemRow = [];
        const headings = this.state.list.headings;
        const items = this.state.list.items;
        // eslint-disable-next-line no-underscore-dangle
        const listID = parseInt(this.state.list._id, 10);
        items.map((item) => ItemRow.push(<Row data={item} key={item.id} listID={listID} />));

        const ItemHeadings = [];
        // eslint-disable-next-line no-underscore-dangle
        headings.map((heading) => ItemHeadings.push(<Table.HeaderCell key={heading._id}>
            {heading.name}
        </Table.HeaderCell>));

        return (
            <div className="List main">
                <Header as="h3" floated="left" dividing>
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
        );
    }
}

View.propTypes = {
    listID: PropTypes.number.isRequired
};

View.defaultProps = {
    listID: 1
};

export default View;
