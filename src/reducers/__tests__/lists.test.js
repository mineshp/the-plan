import lists from '../lists';

describe('lists reducer', () => {
    describe('LIST ACTIONS', () => {
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
});
