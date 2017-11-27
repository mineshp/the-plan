import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Label } from 'semantic-ui-react';
import ListRow from '../ListRow';
import { mockListRowData } from '../../../helpers/test/testData/listData';

const deleteList = jest.fn();
const mockListRow = mockListRowData();

describe('ListRow', () => {
    const mockListRowID = mockListRow._id; // eslint-disable-line no-underscore-dangle
    it('renders correctly', () => {
        const tree = renderer.create(<ListRow
            key={mockListRowID}
            data={mockListRow}
            onDeleteHandler={deleteList}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the correct number of project labels', () => {
        const wrapper = shallow(<ListRow
            key={mockListRowID}
            data={mockListRow}
            onDeleteHandler={deleteList}
        />);
        const ProjectLabels = wrapper.find(Label);

        expect(ProjectLabels.length).toBe(2);
    });
});
