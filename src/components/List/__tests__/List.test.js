import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import List from '../List';
import ListHeadingComponent from '../ListHeadings';
import ListItemsComponent from '../ListItems';
import DisplayMessage from '../../Shared/DisplayMessage';

const mockListData = {
    headings: [
        {
            name: 'A',
            id: '000001',
            position: 1
        },
        {
            name: 'B',
            id: '000002',
            position: 2
        }
    ],
    projects: [],
    items: [
        {
            id: '001',
            columns: []
        },
        {
            id: '002',
            columns: []
        }
    ]
};

describe('List', () => {
    it('renders list correctly', () => {
        const tree = renderer.create(<List list={mockListData} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders ListHeadings component', () => {
        const wrapper = shallow(<List list={mockListData} />);
        expect(wrapper.find(ListHeadingComponent)).toHaveLength(1);
    });

    it('renders ListItemsComponent component', () => {
        const wrapper = shallow(<List list={mockListData} />);
        expect(wrapper.find(ListItemsComponent)).toHaveLength(1);
    });

    it('does not render the display message if there is no error', () => {
        const wrapper = shallow(<List list={mockListData} />);
        expect(wrapper.find(DisplayMessage)).toHaveLength(0);
    });

    it('renders the display message if there is an error', () => {
        const mockError = { error: { isError: true, message: 'oh-no' } };
        const wrapper = shallow(<List errors={mockError} />);
        expect(wrapper.find(DisplayMessage)).toHaveLength(1);
    });
});
