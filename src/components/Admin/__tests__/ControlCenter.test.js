import React from 'react';
import { shallow } from 'enzyme';
import ControlCenterComponent from '../ControlCenter';
import ListUsersComponent from '../ListUsers';
import { mockListUsers } from '../../../helpers/test/testData/controlCenterData';

const mockHandleDeleteUser = jest.fn();
const mockHandleResetPassword = jest.fn();

describe('ControlCenter', () => {
    const mockUsers = mockListUsers();
    it('renders ListUsers component', () => {
        const wrapper = shallow(<ControlCenterComponent
            users={mockUsers}
            handleDeleteUser={mockHandleDeleteUser}
            handleResetPwd={mockHandleResetPassword}
        />);
        expect(wrapper.find(ListUsersComponent)).toHaveLength(1);
    });
});
