import React from 'react';
import { shallow } from 'enzyme';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Footer from '../Footer';

describe('Footer Component', () => {
    it('renders successfully', () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find(Container)).toHaveLength(1);
    });
});
