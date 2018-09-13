import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'semantic-ui-react';
import ListItemRow from './ListItemRow';

const ListUploadFile = () => {
    return (
        <Form>
            <Form.Field>
                <Input
                    placeholder="Upload image"
                    className="text-box-single-col-min"
                />
            </Form.Field>
            <Button color="green" type="submit">Upload</Button>
        </Form>
    );
};

// ListUploadFile.propTypes = {
// };

export default ListUploadFile;
