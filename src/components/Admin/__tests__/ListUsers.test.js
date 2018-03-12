import React from 'react';
import renderer from 'react-test-renderer';
import ListUsersComponent from '../ListUsers';
import { mockListUsers } from '../../../helpers/test/testData/controlCenterData';

const mockHandleDeleteUser = jest.fn();
const mockHandleResetPassword = jest.fn();

describe('Admin > Manage > ListUsers', () => {
    const mockUsers = mockListUsers();
    it('renders ListUsers component', () => {
        const tree = renderer.create(
            <ListUsersComponent
                users={mockUsers}
                handleDeleteUser={mockHandleDeleteUser}
                handleResetPwd={mockHandleResetPassword}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
