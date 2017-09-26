import React from 'react';
import renderer from 'react-test-renderer';
import View from '../View';

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

const mockList = {
    items: [
        {
            id: '123',
            name: 'A',
            createdDate: new Date(),
            updatedDate: new Date()
        }
    ],
    headings: []
};

it('renders correctly', () => {
    const viewListIdParam = {
        match: {
            params: {
                id: 1
            }
        }
    };

    window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve(mockResponse(
            200,
            null,
            JSON.stringify(mockList)
        )));

    const tree = renderer.create(<View match={viewListIdParam.match} />).toJSON();

    expect(tree).toMatchSnapshot();
});
