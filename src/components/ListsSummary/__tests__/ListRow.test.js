import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Label } from 'semantic-ui-react';
import ListRow from '../ListRow';
import { mockListRowData, mockCompletedListRowData } from '../../../helpers/test/testData/listData';

const deleteList = jest.fn();
const mockHandleCompleted = jest.fn();
const mockListRow = mockListRowData();

describe('ListRow', () => {
    const mockListRowID = mockListRow._id; // eslint-disable-line no-underscore-dangle
    it('renders correctly', () => {
        const tree = renderer.create(<ListRow
            key={mockListRowID}
            data={mockListRow}
            onDeleteHandler={deleteList}
            handleCompleted={mockHandleCompleted}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the correct number of project labels', () => {
        const wrapper = shallow(<ListRow
            key={mockListRowID}
            data={mockListRow}
            onDeleteHandler={deleteList}
            handleCompleted={mockHandleCompleted}
        />);
        const ProjectLabels = wrapper.find(Label);

        expect(ProjectLabels.length).toBe(2);
    });

    it('marks the list row as complete if the list is marked as completed', () => {
        const tree = renderer.create(<ListRow
            key={mockListRowID}
            data={mockCompletedListRowData()}
            onDeleteHandler={deleteList}
            handleCompleted={mockHandleCompleted}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
