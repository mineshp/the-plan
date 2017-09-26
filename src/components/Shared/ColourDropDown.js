import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const colours = [
    'red', 'blue', 'orange', 'yellow', 'olive', 'green', 'teal', 'violet',
    'purple', 'pink', 'brown', 'grey', 'black'
];

const DropDownItems = [];
colours.map((colour) => DropDownItems.push({
    key: colour,
    value: colour.toUpperCase(),
    text: colour.toUpperCase(),
    label:
    {
        color: colour,
        empty: true,
        circular: true
    }
}));

const ColourDropDown = (props) => (
    <Select
        placeholder="Choose Colour"
        className="form-dropdown"
        options={DropDownItems}
        onChange={props.handleChange}
    />
);

ColourDropDown.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default ColourDropDown;

