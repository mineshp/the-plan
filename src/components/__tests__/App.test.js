import React from 'react';
import { shallow } from 'enzyme';
import { Container } from 'semantic-ui-react';
import App from '../App';
import Footer from '../Footer';

describe('App Component', () => {
    it('renders Container', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Container)).toHaveLength(1);
        expect(wrapper.find(Footer)).toHaveLength(1);
    });
});
