import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';

const ListProjects = ({
    result,
    cards
}) => (
    <Container>
        {
            (result.error || result.success) &&
            <DisplayMessage status={result} />
        }
        <div className="List main">
            <Card.Group itemsPerRow={3}>
                {cards}
            </Card.Group>
        </div>
    </Container>
);

ListProjects.propTypes = {
    result: PropTypes.shape({}),
    cards: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

ListProjects.defaultProps = {
    result: null,
    cards: []
};

export default ListProjects;
