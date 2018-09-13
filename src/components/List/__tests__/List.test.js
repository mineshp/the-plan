import React from 'react';
import { shallow } from 'enzyme';
import List from '../List';
import ListHeadingComponent from '../ListHeadings';
import ListItemsComponent from '../ListItems';
import ListFooterComponent from '../ListFooter';
import { mockSingleList, mockItemsData } from '../../../helpers/test/testData/listData';

const mockHandleAddItem = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleCompleted = jest.fn();
const mockItems = mockItemsData();
const mockListData = mockSingleList();
const mockDownloadPDF = jest.fn();
const mockHandleListAccordionClick = jest.fn();
const mockActiveIndex = 1;

describe('List', () => {
    it('renders ListHeadings, ListItems and ListFooter components', () => {
        const wrapper = shallow(<List
            list={mockListData}
            handleAddItem={mockHandleAddItem}
            handleChange={mockHandleChange}
            handleSubmit={mockHandleSubmit}
            handleDelete={mockHandleDelete}
            handleCompleted={mockHandleCompleted}
            handleListAccordionClick={mockHandleListAccordionClick}
            activeIndex={mockActiveIndex}
            downloadPDF={mockDownloadPDF}
            items={mockItems}
        />);
        expect(wrapper.find(ListHeadingComponent)).toHaveLength(1);
        expect(wrapper.find(ListItemsComponent)).toHaveLength(1);
        expect(wrapper.find(ListFooterComponent)).toHaveLength(1);
    });
});
