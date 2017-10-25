import lists from '../lists';

describe('lists reducer', () => {
    describe('CREATE ACTIONS', () => {
        it('should handle initial state', () => {
            expect(lists(undefined, {})).toEqual({});
        });

        it('should handle LIST_CREATION_SUCCESS', () => {
            expect(lists({}, {
                type: 'LIST_CREATION_SUCCESS',
                data: {
                    _id: '1234',
                    project: ['a', 'b'],
                    listName: 'Shopping List',
                    createdDate: '2016-05-18T16:00:00Z',
                    updatedDate: '2016-05-18T16:00:00Z'
                }
            })).toEqual({
                success: {
                    data: {
                        _id: '1234',
                        project: ['a', 'b'],
                        listName: 'Shopping List',
                        createdDate: '2016-05-18T16:00:00Z',
                        updatedDate: '2016-05-18T16:00:00Z'
                    },
                    message: 'Successfully created list Shopping List.'
                }
            });
        });

        it('should handle LIST_CREATION_ERROR', () => {
            expect(lists({}, {
                type: 'LIST_CREATION_ERROR',
                error: 'Error creating list'
            })).toEqual({
                error: {
                    message: 'Error creating list',
                    isError: true
                }
            });
        });
    });
    describe('Get all list actions', () => {
        const allLists = [
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

        it('should handle LISTS_RETRIEVED', () => {
            expect(lists({}, {
                type: 'LISTS_RETRIEVED',
                data: {
                    allLists
                }
            })).toEqual({
                data: {
                    allLists
                }
            });
        });

        it('should handle LISTS_RETRIEVED_ERROR', () => {
            expect(lists({}, {
                type: 'LISTS_RETRIEVED_ERROR',
                error: 'Unable to retrieve lists, please try again later.'
            })).toEqual({
                error: {
                    message: 'Unable to retrieve lists, please try again later.',
                    isError: true
                }
            });
        });
    });

    describe('Get a single list actions', () => {
        const aList = [
            {
                _id: '1234',
                project: ['a', 'b'],
                listName: 'Shopping List',
                createdDate: '2016-05-18T16:00:00Z',
                updatedDate: '2016-05-18T16:00:00Z'
            }
        ];

        it('should handle LIST_RETRIEVED', () => {
            expect(lists({}, {
                type: 'LIST_RETRIEVED',
                data: {
                    aList
                }
            })).toEqual({
                data: {
                    aList
                }
            });
        });

        it('should handle LIST_RETRIEVED_ERROR', () => {
            expect(lists({}, {
                type: 'LIST_RETRIEVED_ERROR',
                error: 'Unable to retrieve list with id 1234, please try again later.'
            })).toEqual({
                error: {
                    message: 'Unable to retrieve list with id 1234, please try again later.',
                    isError: true
                }
            });
        });
    });
});
