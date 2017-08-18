import React from 'react';
import { Select } from 'semantic-ui-react'

const colours = [
    'red', 'blue', 'orange', 'yellow', 'olive', 'green', 'teal', 'violet',
    'purple', 'pink', 'brown', 'grey', 'black'
];

let DropDownItems = [];
colours.map((colour) => {
    return DropDownItems.push(
        {
            key: colour,
            value: colour.toUpperCase(),
            text: colour.toUpperCase(),
            label:
                {
                    color: colour,
                    empty: true,
                    circular: true
                }
        }
    )
});

const ColourDropDown = (props) => {
    return (
        <Select placeholder='Choose Colour' options={DropDownItems} onChange={props.handleChange} />
    );
};

export default ColourDropDown;

