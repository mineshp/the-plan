import React from 'react';
import { shallow } from 'enzyme';
import { MainNav } from '../MainNav';
import MainNavComponent from '../../../components/MainNav';

const props = {
    username: 'testUser'
};

describe('MainNav', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<MainNav {...props} />);
    });

    it('renders MainNav component', () => {
        expect(wrapper.find(MainNavComponent).length).toEqual(1);
        expect(wrapper.props().username).toEqual('testUser');
    });
});
