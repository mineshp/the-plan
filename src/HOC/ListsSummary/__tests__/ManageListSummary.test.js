import React from 'react';
import { shallow } from 'enzyme';
import { ManageListSummary } from '../ManageListSummary';
import ListsComponent from '../../../components/ListsSummary/ListsSummary';

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
        deleteList: jest.fn(() => (
            Promise.resolve()
        )),
        retrieveSummaryLists: jest.fn(() => (
            Promise.resolve(mockListAll)
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    lists: {},
    notification: null
};

describe('Manage Lists', () => {
    describe('Get all lists success', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<ManageListSummary {...props} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageListSummary.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
        });

        it('calls the retrieveLists action when the fetchLists function is invoked', async () => {
            wrapper.instance().fetchLists();
            await expect(props.actions.retrieveSummaryLists).toHaveBeenCalledWith();
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('renders a Lists component', async () => {
            const ManageListComponent = shallow(<ManageListSummary />);
            expect(ManageListComponent.find(ListsComponent).length).toEqual(1);
        });

        it('builds an array of ProjectCards', async () => {
            const propsAfterFetchAllLists = Object.assign({}, props, { lists: { data: mockListAll } });
            const ManageListComponent = shallow(<ManageListSummary {...propsAfterFetchAllLists} />);
            await expect(ManageListComponent.props().rows.length).toEqual(2);
        });
    });

    describe('deleteList', () => {
        const mockEvent = {
            preventDefault: jest.fn(),
            target: {
                value: '123'
            }
        };

        const propsAfterSuccessfulDelete = {
            actions: {
                deleteList: jest.fn(() => (
                    Promise.resolve({
                        type: 'LIST_DELETION_SUCCESS'
                    })
                )),
                retrieveSummaryLists: jest.fn(() => (
                    Promise.resolve(mockListAll)
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            },
            lists: {},
            notification: null
        };

        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<ManageListSummary {...propsAfterSuccessfulDelete} />);
        });

        it('calls the deleteList action when the deleteList event is invoked', async () => {
            wrapper.instance().deleteList(mockEvent);

            await expect(propsAfterSuccessfulDelete.actions.deleteList).toHaveBeenCalledWith('123');
            await expect(propsAfterSuccessfulDelete.actions.deleteList()).resolves.toEqual({ type: 'LIST_DELETION_SUCCESS' });
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });

        it('calls the fetchLists function when a list was deleted successfully', async () => {
            wrapper.instance().fetchLists();

            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists).toHaveBeenCalled();
            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists).toHaveBeenCalledTimes(2);
            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists()).resolves.toEqual(mockListAll);
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });
    });
});

