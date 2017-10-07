import React from 'react';
import renderer from 'react-test-renderer';
import UpdateProject from '../UpdateProject';

const mockNewProjectResult = {
    projectName: '',
    colour: ''
};

const mockExistingProjectResult = {
    _id: '1234',
    projectName: 'Senorita',
    colour: 'Teal'
};

const mockSuccessResult = (action) => (
    {
        success: {
            message: `successfully ${action} project, woohoo`
        }
    }
);

const mockErrorResult = {
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
};

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();

describe('Create New Project', () => {
    it('renders create new project form correctly', () => {
        const tree = renderer.create(<UpdateProject
            result={mockNewProjectResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockSuccessResult('created')}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockErrorResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Update Existing Project', () => {
    it('renders update existing project form correctly', () => {
        const tree = renderer.create(<UpdateProject
            result={mockExistingProjectResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockSuccessResult('updated')}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockErrorResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
