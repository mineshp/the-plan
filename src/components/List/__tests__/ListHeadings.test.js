import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListHeadings';
import { mockHeadingsData } from '../../../helpers/test/testData/listData';

const mockHeadings = mockHeadingsData();

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(<ListItems headings={mockHeadings} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
