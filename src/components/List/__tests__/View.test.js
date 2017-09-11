import React from 'react';
import View from '../View';
import renderer from 'react-test-renderer';

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

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
                JSON.stringify(mockList)))
        );

  const tree = renderer.create(
      <View match={viewListIdParam.match}></View>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});