import React from 'react';
import { shallow } from 'enzyme';

import { UserProfile } from '../UserProfile';
import { mockProfileOptions, mockUser } from '../../../helpers/test/testData/authenticationData';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';

const mockEvent = { preventDefault: jest.fn() };
const handleSubmitMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();

const props = {
    actions: {
        retrieveProfiles: jest.fn(() => (
            Promise.resolve({ data: mockListProfiles() })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        )),
        setProfilesToDisplay: jest.fn(() => (
            Promise.resolve()
        )),
        setCurrentUser: jest.fn(() => (
            Promise.resolve()
        ))
    },
    user: mockUser(),
    admin: {
        controlCentre: {
            profiles: mockListProfiles()
        }
    }
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

describe('Manage UserProfile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Set profiles to be displayed', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(
                <UserProfile
                    profileOptions={mockProfileOptions()}
                    handleDropDownSelection={handleDropDownSelectionMock}
                    handleSubmit={handleSubmitMock}
                    {...props}
                />, { context }
            );

            context.router.history.push.mockClear();
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(UserProfile.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
            await expect(props.actions.retrieveProfiles).toHaveBeenCalled();
        });

        it('calls handleDropDownSelection on click of dropDown to choose profile', async () => {
            wrapper.instance().handleDropDownSelection(mockEvent, { value: ['PROFILEX'] });
            await expect(wrapper.state().profilesAssigned).toEqual(['PROFILEX']);
        });

        it('calls handleSubmit successfully', async () => {
            await wrapper.instance().handleDropDownSelection(mockEvent, { value: ['PROFILEY', 'PROFILEZ'] });
            await wrapper.instance().handleSubmit(mockEvent);
            expect(props.actions.setCurrentUser).toHaveBeenCalledTimes(1);
            expect(props.actions.addNotification).toHaveBeenCalledTimes(1);
            await expect(context.router.history.push).toHaveBeenCalledWith('/');
        });
    });
});
