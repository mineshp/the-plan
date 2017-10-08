import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';

const ListProjects = ({
    errors,
    cards
}) => (
    <Container>
        {
            (errors && errors.error) &&
                <DisplayMessage status={errors} />
        }
        <div className="List main">
            <Card.Group itemsPerRow={3}>
                {cards}
            </Card.Group>
        </div>
    </Container>
);

ListProjects.propTypes = {
    errors: PropTypes.shape({}),
    cards: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

ListProjects.defaultProps = {
    errors: null,
    cards: []
};

export default ListProjects;
