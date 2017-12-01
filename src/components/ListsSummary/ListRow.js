import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon, Label } from 'semantic-ui-react';
import { formatDate } from '../../helpers/validators/common';

const projectLabels = (projects) => projects.map((project) => (
    <Label
        as="a"
        key={project.id}
        color="brown"
    >
        <Icon name="empty star" />
        {project.name}
    </Label>
));

const List = ({ data, onDeleteHandler }) => {
    const listID = data._id; // eslint-disable-line no-underscore-dangle
    return (
        <Table.Row>
            <Table.Cell>{data.listName}</Table.Cell>
            <Table.Cell>{formatDate(data.createdDate)}</Table.Cell>
            <Table.Cell>{formatDate(data.updatedDate)}</Table.Cell>
            <Table.Cell>{projectLabels(data.projects)}</Table.Cell>
            <Table.Cell>
                <Button
                    as="a"
                    color="blue"
                    icon="list layout"
                    href={`/list/view/${listID}`}
                />
                <Button
                    as="a"
                    icon="edit"
                    color="green"
                    href={`/list/update/${listID}`}
                />
                <Button
                    icon="trash"
                    color="pink"
                    value={listID}
                    onClick={onDeleteHandler}
                />
            </Table.Cell>
        </Table.Row>
    );
};

List.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        listName: PropTypes.string.isRequired
    }).isRequired,
    onDeleteHandler: PropTypes.func.isRequired
};

export default List;
