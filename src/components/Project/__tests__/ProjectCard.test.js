import React from 'react';
import renderer from 'react-test-renderer';
import ProjectCard from '../ProjectCard';

const deleteHandler = jest.fn();

describe('ProjectCard', () => {
    it('renders correctly', () => {
        const project = {
            _id: '12345',
            color: 'blue',
            projectName: 'test-project'
        };

        const tree = renderer.create(<ProjectCard
            data={project}
            key={project._id} // eslint-disable-line no-underscore-dangle
            onDeleteHandler={deleteHandler}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
