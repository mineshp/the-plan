import React from 'react';
import { shallow } from 'enzyme';
import Register from '../Register';

describe('Login', () => {
    it('renders correctly with valid data', () => {
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        const formErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        const data = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        const RegisterComponent = shallow(
            <Register
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                data={data}
                formErrors={formErrors}
            />
        );

        expect(RegisterComponent).toMatchSnapshot();
    });

    it('renders correctly with invalid data', () => {
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        const formErrors = {
            username: ' is too short',
            email: ' not an email',
            password: ' is too short',
            confirmPassword: ' does not match'
        };

        const data = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        const RegisterComponent = shallow(
            <Register
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                data={data}
                formErrors={formErrors}
            />
        );

        expect(RegisterComponent).toMatchSnapshot();
    });
});
