import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('List actions', () => {
    describe('List Project Actions', () => {
        const mockListSuccessAPIResponse = [
            {
                _id: '1234',
                project: ['a', 'b'],
                listName: 'Shopping List',
                createdDate: '2016-05-18T16:00:00Z',
                updatedDate: '2016-05-18T16:00:00Z'
            },
            {
                _id: '1235',
                project: ['b'],
                listName: 'Holiday',
                createdDate: '2016-05-19T16:00:00Z',
                updatedDate: '2016-05-19T16:05:00Z',
            }
        ];

        const mockListRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve lists, please try again later.'
        };

        it('should dispatch an action for LISTS_RETRIEVED when calling successListingLists to confirm lists were retrieved', () => {
            const expectedAction = {
                type: 'LISTS_RETRIEVED',
                data: mockListSuccessAPIResponse
            };

            expect(actions.successListingLists(mockListSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for LISTS_RETRIEVED_ERROR when calling errorListingLists to notify the user we were unable to retrieve lists', () => {
            const expectedAction = {
                type: 'LISTS_RETRIEVED_ERROR',
                error: mockListRetrievalFailureAPIResponse.message
            };

            expect(actions.errorListingLists(mockListRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveSummaryLists call via the store, dispatches the LISTS_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'LISTS_RETRIEVED',
                    data: mockListSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveSummaryLists()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveLists call via the store, dispatches the LISTS_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListRetrievalFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'LISTS_RETRIEVED_ERROR',
                    error: mockListRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveSummaryLists()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });
});
