import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import ViewList from '../../HOC/List/View';

const View = (props) => (
    <Container>
        <ViewList listID={props.match.params.id} />
    </Container>
);

View.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.number.isRequired
        })
    }).isRequired
};

export default View;
