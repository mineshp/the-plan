import React from 'react';
import renderer from 'react-test-renderer';
import UpdateProject from '../UpdateProject';
import { mockProjectData, mockNewProjectResultData, mockProjectErrorResultData, mockProjectSuccessResultData } from '../../../helpers/test/testData/projectData';

const mockNewProjectResult = mockNewProjectResultData();
const mockExistingProjectResult = mockProjectData();
const mockErrorResult = mockProjectErrorResultData();

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
            result={mockProjectSuccessResultData('created')}
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
            result={mockProjectSuccessResultData('updated')}
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
