import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Label } from 'semantic-ui-react';
import { formatDate } from '../../helpers/validators/common';

const projectLabels = (projects) => projects.slice(0, 3).map((project) => (
    <Label
        as="a"
        key={project.id}
        color="pink"
        href={`/project/${project.name}/lists`}
    > {project.name}
    </Label>
));

const List = ({ data, onDeleteHandler, handleCompleted }) => {
    const listID = data._id; // eslint-disable-line no-underscore-dangle
    const rowProps = {};
    rowProps.negative = data.completed;

    const markListAsCompleteBtn = (
        <Button
            icon="unlock"
            color="violet"
            id={listID}
            onClick={handleCompleted}
            className="button-divider"
            title="List is Active"
        />
    );

    const markListAsUnCompleteBtn = (
        <Button
            icon="lock"
            color="teal"
            id={listID}
            onClick={handleCompleted}
            className="button-divider"
            title="List has been Completed"
        />
    );

    const completedBtn = data.completed ? markListAsUnCompleteBtn : markListAsCompleteBtn;

    return (
        <Table.Row {...rowProps}>
            <Table.Cell>{data.listName}</Table.Cell>
            <Table.Cell>{formatDate(data.createdDate)}</Table.Cell>
            <Table.Cell>{formatDate(data.updatedDate)}</Table.Cell>
            <Table.Cell>{projectLabels(data.projects)}</Table.Cell>
            <Table.Cell>
                {completedBtn}
                <Button
                    as="a"
                    color="blue"
                    icon="list layout"
                    href={`/list/view/${listID}`}
                    title="View/Update List"
                />
                <Button
                    as="a"
                    icon="edit"
                    color="green"
                    href={`/list/update/${listID}`}
                    title="Amend List Setup"
                />
                <Button
                    icon="trash"
                    color="pink"
                    value={listID}
                    onClick={onDeleteHandler}
                    title="Delete List"
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
    onDeleteHandler: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
};

export default List;
