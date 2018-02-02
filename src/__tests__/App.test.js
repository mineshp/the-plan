import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import NotificatioNContainer from '../HOC/Shared/NotificationContainer';
import MainContainer from '../components/MainContainer';
import { MainNavConnectedComponent } from '../HOC/Shared/MainNav';

describe('App Component', () => {
    it('renders NotificatioNContainer, MainNav and MainContainer', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(NotificatioNContainer)).toHaveLength(1);
        expect(wrapper.find(MainNavConnectedComponent)).toHaveLength(1);
        expect(wrapper.find(MainContainer)).toHaveLength(1);
    });
});
