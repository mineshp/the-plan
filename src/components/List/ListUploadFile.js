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

<form class="box" method="post" action="" enctype="multipart/form-data">
  <div class="box__input">
    <input class="box__file" type="file" name="files[]" id="file" data-multiple-caption="{count} files selected" multiple />
    <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
    <button class="box__button" type="submit">Upload</button>
  </div>
  <div class="box__uploading">Uploading&hellip;</div>
  <div class="box__success">Done!</div>
  <div class="box__error">Error! <span></span>.</div>
</form>


export default ListUploadFile;
