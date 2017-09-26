import React from 'react';
import { Button } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';

const Link = ({ active, children, onClick }) => (
    <Button color={active ? 'blue' : null} active={active} onClick={() => { onClick(); }}>
        {children}
    </Button>
);

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Link;
