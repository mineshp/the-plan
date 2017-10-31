import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'semantic-ui-react';
import ListHeadings from './ListHeadings';
import ListItems from './ListItems';

const List = ({ list }) => (
    <div className="List main">
        <Container>
            <Table celled striped>
                <ListHeadings headings={list.headings} />
                <ListItems items={list.items} headings={list.headings} />
            </Table>
        </Container>
    </div>
);

List.propTypes = {
    list: PropTypes.shape({}).isRequired
};

List.defaultProps = {
    list: {
        projects: [],
        headings: [],
        items: []
    }
};

export default List;
