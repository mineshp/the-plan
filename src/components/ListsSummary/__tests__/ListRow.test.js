import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Label } from 'semantic-ui-react';
import ListRow from '../ListRow';
import { mockListRowData, mockCompletedListRowData } from '../../../helpers/test/testData/listData';

const deleteList = jest.fn();
const mockHandleCompleted = jest.fn();
const mockListRow = mockListRowData();
const mockOnBtnClickHandler = jest.fn();

describe('ListRow', () => {
    const mockListRowID = mockListRow._id; // eslint-disable-line no-underscore-dangle

    it('renders correctly', () => {
        const tree = renderer.create(<MemoryRouter>
            <ListRow
                key={mockListRowID}
                data={mockListRow}
                onDeleteHandler={deleteList}
                handleCompleted={mockHandleCompleted}
                onBtnClickHandler={mockOnBtnClickHandler}
            />
        </MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the correct number of project labels', () => {
        const wrapper = shallow(<ListRow
            key={mockListRowID}
            data={mockListRow}
            onDeleteHandler={deleteList}
            handleCompleted={mockHandleCompleted}
            onBtnClickHandler={mockOnBtnClickHandler}
        />);
        const ProjectLabels = wrapper.find(Label);

        expect(ProjectLabels.length).toBe(2);
    });

    it('marks the list row as complete if the list is marked as completed', () => {
        const tree = renderer.create(<MemoryRouter><ListRow
            key={mockListRowID}
            data={mockCompletedListRowData()}
            onDeleteHandler={deleteList}
            handleCompleted={mockHandleCompleted}
            onBtnClickHandler={mockOnBtnClickHandler}
        /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
