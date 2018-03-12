import React from 'react';
import { shallow } from 'enzyme';
import { ManageListSummary } from '../ManageListSummary';
import ListsComponent from '../../../components/ListsSummary/ListsSummary';
import LoadingComponent from '../../../components/Shared/Loading';
import mockEvent from '../../../helpers/test/testData';
import { mockListSummary, mockListSummaryByProject } from '../../../helpers/test/testData/listSummaryData';

const mockListAll = mockListSummary();
const mockListByProject = mockListSummaryByProject();
const props = {
    actions: {
        deleteList: jest.fn(() => (
            Promise.resolve()
        )),
        retrieveSummaryLists: jest.fn(() => (
            Promise.resolve({ data: mockListAll })
        )),
        retrieveSummaryListsByProject: jest.fn(() => (
            Promise.resolve({ data: mockListByProject })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    notification: null,
    match: {
        params: null
    }
};

describe('Manage Lists', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Get all lists success', () => {
        let wrapper;
        const propsWithListData = Object.assign({}, props, {
            lists: { data: mockListAll },
            notification: {
                message: 'Retrieved list summary',
                level: 'success',
                title: 'success'
            }
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
            await expect(propsWithListData.actions.addNotification).toHaveBeenCalledWith({
                message: 'Retrieved list summary',
                level: 'success',
                title: 'success'
            });
        });

        it('renders a Lists component', () => {
            expect(wrapper.find(ListsComponent).length).toEqual(1);
        });

        it('builds an array of ProjectCards', async () => {
            await expect(wrapper.props().rows.length).toEqual(2);
        });
    });

    describe('Get lists for a given project success', () => {
        let wrapper;
        const propsWithListData = Object.assign({}, props, {
            lists: { data: mockListAll },
            match: { params: { projectName: 'marvel' } },
            notification: {
                message: 'Retrieved list summary by project',
                level: 'success',
                title: 'success'
            }
        });

        beforeEach(() => {
            wrapper = shallow(<ManageListSummary {...propsWithListData} />);
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageListSummary.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
        });

        it('calls the retrieveSummaryListsByProject action when the fetchLists function is invoked ', async () => {
            wrapper.instance().fetchLists();
            await expect(propsWithListData.actions.retrieveSummaryListsByProject).toHaveBeenCalledWith('marvel');
            await expect(propsWithListData.actions.retrieveSummaryLists).not.toHaveBeenCalled();
            await expect(propsWithListData.actions.addNotification).toHaveBeenCalledWith({
                message: 'Retrieved list summary by project',
                level: 'success',
                title: 'success'
            });
        });

        it('renders a Lists component', () => {
            expect(wrapper.find(ListsComponent).length).toEqual(1);
        });

        it('builds an array of lists', async () => {
            await expect(wrapper.props().rows.length).toEqual(2);
        });
    });

    describe('Get all lists fails', () => {
        let wrapper;
        let propsAfterFetchListSummaryError;

        const apiError = {
            error: {
                isError: true,
                message: 'Unable to retrieve a list summary, please try again later.'
            }
        };

        beforeEach(() => {
            const propsActions = Object.assign({}, {
                deleteList: jest.fn(() => (
                    Promise.resolve()
                )),
                retrieveSummaryLists: jest.fn(() => (
                    Promise.resolve({ error: 'oh-no' })
                )),
                retrieveSummaryListsByProject: jest.fn(() => (
                    Promise.resolve({ error: 'oh-dear' })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            });

            propsAfterFetchListSummaryError = Object.assign({}, props,
                {
                    actions: propsActions,
                    lists: { error: apiError }
                }
            );
            wrapper = shallow(<ManageListSummary {...propsAfterFetchListSummaryError} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('displays loading component when action to fetch lists is not complete', async () => {
            expect(wrapper.props().lists).toBe(undefined);
            expect(wrapper.find(LoadingComponent).length).toEqual(1);
        });

        it('retrieveSummaryLists - sets the notification to unknown error when no props notification exists', async () => {
            wrapper.instance().fetchLists();
            await expect(propsAfterFetchListSummaryError.actions.retrieveSummaryLists).toHaveBeenCalled();
            await expect(propsAfterFetchListSummaryError.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-no',
                level: 'error',
                title: 'Unknown Error'
            });
        });

        it('retrieveSummaryListsByProject - sets the notification to unknown error when no props notification exists', async () => {
            const propsAfterFetchListSummaryByProjectError = Object.assign({}, propsAfterFetchListSummaryError, { match: { params: { projectName: 'testProject' } } });
            wrapper = shallow(<ManageListSummary {...propsAfterFetchListSummaryByProjectError} />);
            wrapper.instance().fetchLists();
            await expect(propsAfterFetchListSummaryError.actions.retrieveSummaryListsByProject).toHaveBeenCalled();
            await expect(propsAfterFetchListSummaryError.actions.addNotification).toHaveBeenCalledWith({
                message: 'oh-dear',
                level: 'error',
                title: 'Unknown Error'
            });
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
                retrieveSummaryListsByProject: jest.fn(() => (
                    Promise.resolve({ data: mockListByProject })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            },
            lists: {},
            notification: null,
            match: {
                params: null
            }
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

