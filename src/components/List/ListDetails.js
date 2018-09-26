import React from 'react';
import PropTypes from 'prop-types';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { formatDate } from '../../helpers/validators/common';

const ListDetails = ({ list }) => {
    const owner = list.owner ? list.owner : 'unknown';
    return (
        <Table>
            <Table.Body>
                <Table.Row>
                    <Table.Cell className="details-header">Owner:</Table.Cell>
                    <Table.Cell>{owner}</Table.Cell>
                    <Table.Cell className="details-header">Created Date:</Table.Cell>
                    <Table.Cell>{formatDate(list.createdDate)}</Table.Cell>
                    <Table.Cell className="details-header">Last Updated:</Table.Cell>
                    <Table.Cell>{formatDate(list.updatedDate)}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
};

ListDetails.propTypes = {
    list: PropTypes.shape({}).isRequired
};

export default ListDetails;
