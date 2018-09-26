import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ListItems from '../ListHeadings';
import { mockHeadingsData } from '../../../helpers/test/testData/listData';

const mockHeadings = mockHeadingsData();

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ListItems
                    headings={mockHeadings}
                    listId="112"
                /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
