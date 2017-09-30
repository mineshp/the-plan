import React from 'react';
import renderer from 'react-test-renderer';
import ProjectCard from '../ProjectCard';
import ListProjects from '../ListProjects';

const mockResult = {};
const mockErrorResult = {
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
};
const mockProject = {
    _id: '1',
    projectName: 'test'
};

const mockHandleDelete = jest.fn();
const mockCards = [
    // eslint-disable-next-line no-underscore-dangle
    <ProjectCard data={mockProject} key={mockProject._id} onDeleteHandler={mockHandleDelete} />
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
