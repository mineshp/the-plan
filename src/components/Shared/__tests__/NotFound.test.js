import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound';

describe('NotFound 404 component', () => {
    it('renders correctly', () => {
        const NotFoundComponent = shallow(
            <NotFound />
        );

        expect(NotFoundComponent).toMatchSnapshot();
    });
});
