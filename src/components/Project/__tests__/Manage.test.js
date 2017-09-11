import React from 'react';
import Manage from '../Manage';
import renderer from 'react-test-renderer';

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

describe('Manage Project', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(
                200, null, JSON.stringify(mockListAllProjects) )));
    });

    it('renders correctly', () => {
        const tree = renderer.create(
            <Manage></Manage>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
