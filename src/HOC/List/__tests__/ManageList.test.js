import React from 'react';
import { mount, shallow } from 'enzyme';
import ManageList from '../ManageList';
import ListRow from '../../../components/List/ListRow';
import DisplayMessage from '../../../components/Shared/DisplayMessage';

const mockListAll = [
    {
        _id: '5992092f66a7043f2598c88e',
        projects: [
            {
                id: 'abc123',
                name: 'biology'
            },
            {
                id: 'xyz123',
                name: 'chemistry'
            }
        ],
        listName: 'HumanBody',
        createdDate: '2016-05-18T16:00:00Z',
        updatedDate: '2016-05-18T16:00:00Z',
        headings: [
            {
                position: 1,
                id: '1',
                name: 'Name'
            },
            {
                position: 2,
                id: '2',
                name: 'Created'
            }
        ],
        items: [
            {
                updatedDate: '2016-05-18T16:00:00Z',
                createdDate: '2016-05-18T16:00:00Z',
                position: 1,
                id: '1',
                name: 'Head'
            },
            {
                updatedDate: '2016-05-18T16:00:00Z',
                createdDate: '2016-05-18T16:00:00Z',
                position: 2,
                id: '2',
                name: 'Shoulder'
            }
        ]
    }
];

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Manage Lists', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(200, null, JSON.stringify(mockListAll))));
    });

    it('calls componentDidMount', async () => {
        const componentDidMountSpy = jest.spyOn(ManageList.prototype, 'componentDidMount');
        const wrapper = mount(<ManageList />);
        await wrapper.instance().componentDidMount();
        expect(componentDidMountSpy).toHaveBeenCalled();
    });

    it('fetch all lists', async () => {
        const wrapper = mount(<ManageList />);
        expect(wrapper.state().lists).toEqual([]);
        await fetch('/foo/bar')
            .then((res) => res.json())
            .then((lists) => expect(lists).toEqual(mockListAll));
    });

    it('renders ListRows correctly for projects', async () => {
        const ManageListComponent = shallow(<ManageList />);
        ManageListComponent.setState({ lists: mockListAll });
        expect(ManageListComponent.find(ListRow).length).toEqual(1);
    });

    it('does not render a Display Message when fetching lists is successful', async () => {
        const ManageListComponent = shallow(<ManageList />);
        await ManageListComponent.instance().componentDidMount();

        expect(ManageListComponent.find(DisplayMessage).length).toEqual(0);
    });
});

describe('Get all lists fails', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockReturnValue(Promise.resolve({}));
    });

    it('sets a notification when the client is unable to connect to the api', async () => {
        const wrapper = mount(<ManageList />);
        await wrapper.instance().componentDidMount();

        expect(wrapper.state().notification).toEqual({
            error: {
                message: 'Unable to retrieve lists, please try again later.',
                isError: true
            }
        });
    });

    it('renders a Display Message when fetching lists fails', async () => {
        const ManageListComponent = shallow(<ManageList />);
        await ManageListComponent.instance().componentDidMount();

        expect(ManageListComponent.find(DisplayMessage).length).toEqual(1);
    });
});
