import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

const CheckBoxGroup = ({
    data,
    assigned,
    handleCheckBoxChange
}) => {
    const CheckBoxItems = [];
    data.map((item) => {
        const keyId = item._id; // eslint-disable-line no-underscore-dangle
        const isChecked = assigned.includes(item.name);
        const checkedState = isChecked ? 'true' : 'false';

        return CheckBoxItems.push(
            <Form.Field key={keyId}>
                <Checkbox
                    label={item.name}
                    id={keyId}
                    data-cb={item.name}
                    onChange={handleCheckBoxChange}
                    checked={isChecked}
                    value={checkedState}
                />
            </Form.Field>
        );
    });
    return (
        <div>{ CheckBoxItems }</div>
    );
};

CheckBoxGroup.propTypes = {
    handleCheckBoxChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    assigned: PropTypes.arrayOf(PropTypes.string)
};

CheckBoxGroup.defaultProps = {
    assigned: null
};

export default CheckBoxGroup;

