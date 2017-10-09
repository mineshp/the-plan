import React from 'react';
import { shallow } from 'enzyme';
import { ManageList } from '../ManageList';
import ListsComponent from '../../../components/List/List';

const mockListAll = [
    {
        _id: '001',
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
        updatedDate: '2016-05-18T16:00:00Z'
    },
    {
        _id: '002',
        projects: [
            {
                id: '0011',
                name: 'history'
            }
        ],
        listName: 'Explorers',
        createdDate: '2016-10-8T13:16:00Z',
        updatedDate: '2016-10-8T16:00:00Z',
    }
];

const props = {
    actions: {
        retrieveSummaryLists: jest.fn(() => (
            Promise.resolve(mockListAll)
        ))
    },
    lists: {} // TODO: Turn to ARRAY
};

describe('Manage Lists', () => {
    describe('Get all lists success', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ManageList {...props} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageList.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
        });

        it('calls the retrieveLists action when the fetchLists function is invoked', async () => {
            wrapper.instance().fetchLists();
            await expect(props.actions.retrieveSummaryLists).toHaveBeenCalledWith();
        });

        it('renders a Lists component', async () => {
            const ManageListComponent = shallow(<ManageList />);
            expect(ManageListComponent.find(ListsComponent).length).toEqual(1);
        });

        it('builds an array of ProjectCards', async () => {
            const propsAfterFetchAllLists = Object.assign({}, props, { lists: { data: mockListAll } });
            const ManageListComponent = shallow(<ManageList {...propsAfterFetchAllLists} />);
            await expect(ManageListComponent.props().rows.length).toEqual(2);
        });
    });

    describe('Get all lists fails', () => {
        it('sets an api error when the client is unable to connect to the api', async () => {
            const apiError = {
                error: {
                    isError: true,
                    message: 'Unable to retrieve lists, please try again later.'
                }
            };
            const propsAfterFetchListsError = Object.assign({}, props, { lists: { error: apiError } });
            const ManageListComponent = shallow(<ManageList {...propsAfterFetchListsError} />);

            expect(ManageListComponent.props().errors).toEqual({
                error: {
                    message: 'Unable to retrieve lists, please try again later.',
                    isError: true
                }
            });
        });
    });
});

