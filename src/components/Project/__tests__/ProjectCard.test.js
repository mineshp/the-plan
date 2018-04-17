import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ProjectCard from '../ProjectCard';
import { mockProjectData } from '../../../helpers/test/testData/projectData';

const deleteHandler = jest.fn();

describe('ProjectCard', () => {
    it('renders correctly', () => {
        const project = mockProjectData();

        const tree = renderer.create(
            <MemoryRouter>
                <ProjectCard
                    data={project}
                    key={project._id} // eslint-disable-line no-underscore-dangle
                    onDeleteHandler={deleteHandler}
                />
            </MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
