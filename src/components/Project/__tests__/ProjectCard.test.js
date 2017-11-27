import React from 'react';
import renderer from 'react-test-renderer';
import ProjectCard from '../ProjectCard';
import { mockProjectData } from '../../../helpers/test/testData/projectData';

const deleteHandler = jest.fn();

describe('ProjectCard', () => {
    it('renders correctly', () => {
        const project = mockProjectData();

        const tree = renderer.create(<ProjectCard
            data={project}
            key={project._id} // eslint-disable-line no-underscore-dangle
            onDeleteHandler={deleteHandler}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
