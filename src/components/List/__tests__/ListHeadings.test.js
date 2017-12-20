import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListHeadings';
import { mockHeadingsData } from '../../../helpers/test/testData/listData';

const mockHeadings = mockHeadingsData();
const mockDownloadPDF = jest.fn();

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(
            <ListItems
                headings={mockHeadings}
                downloadPDF={mockDownloadPDF}
                listId="112"
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
