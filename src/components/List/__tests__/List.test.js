import React from 'react';
import renderer from 'react-test-renderer';
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
const mockItems = mockItemsData();
const mockListData = mockSingleList();

describe('List', () => {
    it('renders list correctly', () => {
        const tree = renderer.create(
            <List
                list={mockListData}
                handleAddItem={mockHandleAddItem}
                handleChange={mockHandleChange}
                handleSubmit={mockHandleSubmit}
                handleDelete={mockHandleDelete}
                items={mockItems}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders ListHeadings component', () => {
        const wrapper = shallow(<List
            list={mockListData}
            handleAddItem={mockHandleAddItem}
            handleChange={mockHandleChange}
            handleSubmit={mockHandleSubmit}
            handleDelete={mockHandleDelete}
            items={mockItems}
        />);
        expect(wrapper.find(ListHeadingComponent)).toHaveLength(1);
    });

    it('renders ListItemsComponent component', () => {
        const wrapper = shallow(<List
            list={mockListData}
            handleAddItem={mockHandleAddItem}
            handleChange={mockHandleChange}
            handleSubmit={mockHandleSubmit}
            handleDelete={mockHandleDelete}
            items={mockItems}
        />);
        expect(wrapper.find(ListItemsComponent)).toHaveLength(1);
    });

    it('renders ListFooterComponent component', () => {
        const wrapper = shallow(<List
            list={mockListData}
            handleAddItem={mockHandleAddItem}
            handleChange={mockHandleChange}
            handleSubmit={mockHandleSubmit}
            handleDelete={mockHandleDelete}
            items={mockItems}
        />);
        expect(wrapper.find(ListFooterComponent)).toHaveLength(1);
    });
});
