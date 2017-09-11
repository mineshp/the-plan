import React from 'react';
import { mount, shallow } from 'enzyme';
import ManageProject from '../ManageProject';
import ProjectCard from '../../../components/Project/ProjectCard';

const mockListAllProjects = [
    {
        _id: "5992d50066a7043f2598e12d",
        projectName: "PROJECT 1",
        colour: "red",
        createdDate: "2017-08-15T12:02:00.000Z"
    },
    {
        _id: "59a08710e57cb1da97cd1477",
        projectName: "PROJECT 2",
        colour: "red",
        __v: 0,
        createdDate: "2017-08-25T20:22:40.994Z"
    },
    {
        _id: "59a08bb6e57cb1da97cd1478",
        projectName: "PROJECT 3",
        colour: "grey",
        __v: 0,
        createdDate: "2017-08-25T20:42:30.159Z"
    }
];

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('Manage Projects', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(
                200, null, JSON.stringify(mockListAllProjects) )));
    });

    it('calls componentDidMount', () => {
        const componentDidMountSpy = jest.spyOn(ManageProject.prototype, 'componentDidMount');
        const wrapper = mount(<ManageProject />);
        wrapper.instance().componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalled();
    });

    it('fetch all projects', async () => {
        const wrapper = mount(<ManageProject />);
        expect(wrapper.state().projects).toEqual([]);
        await fetch('/foo/bar')
            .then(res => res.json())
            .then(projects => expect(projects).toEqual(mockListAllProjects));
    });

    it('renders Cards correctly for projects', async () => {
        const ManageProjectComponent = shallow(<ManageProject />);
        ManageProjectComponent.setState({ projects: mockListAllProjects });
        expect(ManageProjectComponent.find(ProjectCard).length).toEqual(3);
    });
});