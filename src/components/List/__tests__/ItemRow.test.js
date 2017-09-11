import React from 'react';
import ItemRow from '../ItemRow';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';

const mockRowData = {
    id: '1',
    name: 'test',
    createdDate: "2017-08-25T20:22:40.994Z",
    updatedDate: "2017-08-29T12:09:29.443Z",
    notes: 'I am a note',
    owner: 'Miss Appleby'
};

describe('ItemRow', () => {
    it('renders item row correctly', () => {
        const tree = renderer.create(
            <ItemRow data={mockRowData} listID='123' />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders a delete button', () => {
        const wrapper = shallow(<ItemRow data={mockRowData} listID='123' />);
        const DeleteBtn = wrapper.find(Button);

        expect(DeleteBtn.length).toBe(1);
        expect(DeleteBtn.props().children).toBe('Delete');
        expect(DeleteBtn.props().href).toBe('/list/123/item/1/delete');
    });
});