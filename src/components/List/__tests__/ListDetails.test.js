import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'semantic-ui-react';
import ListDetails from '../ListDetails';

describe('ListDetails', () => {
    it('renders list owner correctly when a list owner exists', () => {
        const mockListOwner = { owner: 'testUser' };

        const wrapper = shallow(<ListDetails
            list={mockListOwner}
        />);
        const owner = wrapper.find(Table.Cell).at(1);
        expect(owner.props().children).toEqual('testUser');
    });

    it('renders list owner as `unknown` when a list owner does not exist', () => {
        const mockListOwner = {};

        const wrapper = shallow(<ListDetails
            list={mockListOwner}
        />);
        const owner = wrapper.find(Table.Cell).at(1);
        expect(owner.props().children).toEqual('unknown');
    });
});
