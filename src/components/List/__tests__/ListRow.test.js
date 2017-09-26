import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Label } from 'semantic-ui-react';
import ListRow from '../ListRow';

const mockListRow = {
    _id: '1234456',
    listName: 'My Awesome List',
    projects: [{
        id: '1',
        name: 'ABC'
    },
    {
        id: '2',
        name: 'XYZ'
    }]
};

describe('ListRow', () => {
    const mockListRowID = mockListRow._id; // eslint-disable-line no-underscore-dangle
    it('renders correctly', () => {
        const tree = renderer.create(<ListRow key={mockListRowID} data={mockListRow} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the correct number of project labels', () => {
        const wrapper = shallow(<ListRow key={mockListRowID} data={mockListRow} />);
        const ProjectLabels = wrapper.find(Label);

        expect(ProjectLabels.length).toBe(2);
    });
});
