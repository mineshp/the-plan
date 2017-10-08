import React from 'react';
import { shallow } from 'enzyme';
import { Container } from 'semantic-ui-react';
import Footer from '../Footer';

describe('Footer Component', () => {
    it('renders successfully', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(Container)).toHaveLength(1);
    });
});
