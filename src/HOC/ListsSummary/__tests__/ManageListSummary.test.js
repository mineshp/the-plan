import React from 'react';
import { shallow } from 'enzyme';
import { ManageListSummary } from '../ManageListSummary';
import ListsComponent from '../../../components/ListsSummary/ListsSummary';
import LoadingComponent from '../../../components/Shared/Loading';
import mockEvent from '../../../helpers/test/testData';
import { mockListSummary } from '../../../helpers/test/testData/listSummaryData';

const mockListAll = mockListSummary();
const props = {
    actions: {
        deleteList: jest.fn(() => (
            Promise.resolve()
        )),
        retrieveSummaryLists: jest.fn(() => (
            Promise.resolve({ data: mockListAll })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    notification: null
};

describe('Manage Lists', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Get all lists success', () => {
        let wrapper;
        const propsWithListData = Object.assign({}, props, {
            lists: { data: mockListAll }
        });

        beforeEach(() => {
            wrapper = shallow(<ManageListSummary {...propsWithListData} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageListSummary.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
        });

        it('calls the retrieveLists action when the fetchLists function is invoked', async () => {
            wrapper.instance().fetchLists();
            await expect(propsWithListData.actions.retrieveSummaryLists).toHaveBeenCalledWith();
            await expect(propsWithListData.actions.addNotification).toHaveBeenCalled();
        });

        it('renders a Lists component', () => {
            expect(wrapper.find(ListsComponent).length).toEqual(1);
        });

        it('builds an array of ProjectCards', async () => {
            await expect(wrapper.props().rows.length).toEqual(2);
        });
    });

    describe('Get all lists fails', () => {
        it('sets an api error when the client is unable to connect to the api', async () => {
            const apiError = {
                error: {
                    isError: true,
                    message: 'Unable to retrieve a list summary, please try again later.'
                }
            };
            const propsAfterFetchListSummaryError = Object.assign({}, props, { lists: { error: apiError } });
            const ManageListComponent = shallow(<ManageListSummary {...propsAfterFetchListSummaryError} />);

            expect(ManageListComponent.props().lists).toBe(undefined);
            expect(ManageListComponent.find(LoadingComponent).length).toEqual(1);
        });
    });

    describe('deleteList', () => {
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
            wrapper.instance().deleteList(mockEvent());

            await expect(propsAfterSuccessfulDelete.actions.deleteList).toHaveBeenCalledWith('123');
            await expect(propsAfterSuccessfulDelete.actions.deleteList()).resolves.toEqual({ type: 'LIST_DELETION_SUCCESS' });
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });

        it('calls the fetchLists function when a list was deleted successfully', async () => {
            wrapper.instance().fetchLists();

            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists).toHaveBeenCalled();
            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists).toHaveBeenCalledTimes(1);
            await expect(propsAfterSuccessfulDelete.actions.retrieveSummaryLists()).resolves.toEqual(mockListAll);
            await expect(propsAfterSuccessfulDelete.actions.addNotification).toHaveBeenCalled;
        });
    });
});

