import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'semantic-ui-react';

const ProjectCard = ({ data, onDeleteHandler }) => (
    <Card color={data.colour}>
        <Card.Content>
            <Card.Header>
                {data.projectName}
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Card.Meta>
                {data.createdDate}
            </Card.Meta>
            <Card.Description>
            Add a description here
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className="buttons">
                <Button
                    content="Update"
                    icon="edit"
                    labelPosition="left"
                    color="teal"
                />
                <Button
                    content="Delete"
                    icon="trash"
                    labelPosition="left"
                    color="blue"
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
