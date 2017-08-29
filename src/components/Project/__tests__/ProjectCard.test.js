import React from 'react';
import ProjectCard from '../ProjectCard';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const project = {
    _id: '12345',
    color: 'blue',
    projectName: 'test-project'
  };

  const tree = renderer.create(
    <ProjectCard data={project} key={project._id}></ProjectCard>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});