import React from 'react';
import { mount, shallow } from 'enzyme';
import View from '../View';
import ItemRow from '../../../components/List/ItemRow';

const mockTestList = {
    _id: "5992092f66a7043f2598c88e",
    projects: [
        {
            id: "abc123",
            name: "biology"
        },
        {
            id: "xyz123",
            name: "chemistry"
        }
    ],
    listName: "HumanBody",
    createdDate: "2016-05-18T16:00:00Z",
    updatedDate: "2016-05-18T16:00:00Z",
    headings: [
        {
            position: 1,
            id: "1",
            name: "Name"
        },
        {
            position: 2,
            id: "2",
            name: "Created"
        }
    ],
    items: [
        {
            updatedDate: "2016-05-18T16:00:00Z",
            createdDate: "2016-05-18T16:00:00Z",
            position: 1,
            id: "1",
            name: "Head"
        },
        {
            updatedDate: "2016-05-18T16:00:00Z",
            createdDate: "2016-05-18T16:00:00Z",
            position: 2,
            id: "2",
            name: "Shoulder"
        }
    ]
};

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('View List', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(
                200, null, JSON.stringify(mockTestList) )));
    });

    it('calls componentDidMount', () => {
        const componentDidMountSpy = jest.spyOn(View.prototype, 'componentDidMount');
        const wrapper = mount(<View />);
        wrapper.instance().componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalled();
    });

    it('fetch a view', async () => {
        const wrapper = mount(<View />);
        expect(wrapper.state().list).toEqual(
            { "headings": [], "items": [] }
        );
        await fetch('/foo/1/bar')
            .then(res => res.json())
            .then(list => expect(list).toEqual(mockTestList));
    });

    it('renders an ItemRow correctly for a list', async () => {
        const ViewComponent = shallow(<View />);
        ViewComponent.setState({ list: mockTestList });
        expect(ViewComponent.find(ItemRow).length).toEqual(2);
    });
});