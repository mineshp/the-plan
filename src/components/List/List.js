import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';
import ListHeadings from './ListHeadings';
import ListItems from './ListItems';

const List = ({ list, errors }) => (
    <div className="List main">
        {
            (errors && errors.error) && <DisplayMessage status={errors} />
        }
        <Container>
            <Table celled striped>
                <ListHeadings headings={list.headings} />
                <ListItems items={list.items} headings={list.headings} />
            </Table>
        </Container>
    </div>
);

List.propTypes = {
    list: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({})
};

List.defaultProps = {
    list: {
        projects: [],
        headings: [],
        items: []
    },
    errors: {}
};

export default List;
