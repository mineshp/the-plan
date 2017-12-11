import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';
import { formatDate } from '../../helpers/validators/common';

const ProjectCard = ({ data, onDeleteHandler }) => (
    <Card color={data.colour}>
        <Card.Content>
            <Card.Header>
                {data.projectName}
                <Button
                    floated="right"
                    icon="list layout"
                    color="blue"
                    href={`/project/${data.projectName}/lists`} // eslint-disable-line no-underscore-dangle
                />
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Card.Meta>
                {formatDate(data.createdDate)}
            </Card.Meta>
            <Card.Description>
            Add a description here
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className="buttons">
                <Button
                    as="a"
                    content="Update"
                    icon="edit"
                    labelPosition="left"
                    color="green"
                    href={`/project/update/${data._id}`} // eslint-disable-line no-underscore-dangle
                />
                <Button
                    content="Delete"
                    icon="trash"
                    labelPosition="left"
                    color="pink"
                    value={data._id} // eslint-disable-line no-underscore-dangle
                    onClick={onDeleteHandler}
                />
            </div>
        </Card.Content>
    </Card>
);

ProjectCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
        colour: PropTypes.string
    }).isRequired,
    onDeleteHandler: PropTypes.func.isRequired

};

export default ProjectCard;
