import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ProjectCard from '../ProjectCard';
import ListProjects from '../ListProjects';
import { mockProjectData } from '../../../helpers/test/testData/projectData';

const mockResult = {};
const mockErrorResult = {
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
};
const mockProject = mockProjectData();

const mockHandleDelete = jest.fn();
// eslint-disable-next-line no-underscore-dangle
const mockProjectId = mockProject._id;
const mockCards = [
    <MemoryRouter key={mockProjectId}>
        <ProjectCard data={mockProject} key={mockProjectId} onDeleteHandler={mockHandleDelete} />
    </MemoryRouter>
];

describe('List Projects', () => {
    it('renders projects correctly', () => {
        const tree = renderer.create(<ListProjects
            errors={mockResult}
            cards={mockCards}
            onDeleteHandler={mockHandleDelete}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<ListProjects
            errors={mockResult}
            cards={mockCards}
            onDeleteHandler={mockHandleDelete}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<ListProjects
            errors={mockErrorResult}
            cards={mockCards}
            onDeleteHandler={mockHandleDelete}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
