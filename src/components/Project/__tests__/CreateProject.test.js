import React from 'react';
import CreateProject from '../CreateProject';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Form } from 'semantic-ui-react';

const mockResult = {};
const mockSuccessResult = {
    success: {
        message: 'successfully created new project, woohoo'
    }
};

const mockErrorResult = {
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
};

const mockProjectName = 'Test Project'

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();

describe.only('Create New Project', () => {
    it('renders create new project form correctly', () => {
        const tree = renderer.create(
            <CreateProject
                result={mockResult}
                handleSubmit={mockHandleSubmit}
                handleChange={mockHandleChange}
                handleDropDownSelection={mockHandleDropDownSelection}
            ></CreateProject>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(
            <CreateProject
                result={mockSuccessResult}
                handleSubmit={mockHandleSubmit}
                handleChange={mockHandleChange}
                handleDropDownSelection={mockHandleDropDownSelection}
            ></CreateProject>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(
            <CreateProject
                result={mockErrorResult}
                handleSubmit={mockHandleSubmit}
                handleChange={mockHandleChange}
                handleDropDownSelection={mockHandleDropDownSelection}
            ></CreateProject>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});


