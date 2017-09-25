import React from 'react';
import ListProjects from '../ListProjects';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Card, Form } from 'semantic-ui-react';
import ProjectCard from '../ProjectCard';

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

const mockProject = {
    _id: '1',
    projectName: 'test'
};

const mockHandleDelete = jest.fn();
const mockCards = [
    <ProjectCard data={mockProject} key={mockProject._id} onDeleteHandler={mockHandleDelete} />
];

describe('List Projects', () => {
    it('renders projects correctly', () => {
        const tree = renderer.create(
            <ListProjects
                result={mockResult}
                cards={mockCards}
                onDeleteHandler={mockHandleDelete}
            ></ListProjects>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(
            <ListProjects
                result={mockSuccessResult}
                cards={mockCards}
                onDeleteHandler={mockHandleDelete}
            ></ListProjects>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(
            <ListProjects
                result={mockErrorResult}
                cards={mockCards}
                onDeleteHandler={mockHandleDelete}
            ></ListProjects>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
