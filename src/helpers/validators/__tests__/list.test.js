import { addOrRemoveItems, buildListData, listSetupIsComplete, validateHeadings } from '../list';

describe('Helpers', () => {
    describe('validate', () => {
        describe('list', () => {
            const originalObject = {
                _id: '123456',
                listName: 'existingListName',
                headings: [{ id: '1', name: 'A' }, { id: '2', name: 'B' }],
                projects: [{ id: '001', name: 'project' }],
                items: [],
                createdDate: new Date()
            };

            const updatedListData = {
                listName: 'updatedListName',
                headings: [{ id: '1', name: 'X' }, { id: '2', name: 'Y' }, { id: '3', name: 'Z' }],
                projects: [{ id: '001', name: 'history' }],
            };

            it('buildListData uses original object data if no listName, headings or projects passed', () => {
                expect(buildListData(originalObject, {})).toEqual({
                    _id: '123456',
                    listName: 'existingListName',
                    headings: [{ id: '1', name: 'A' }, { id: '2', name: 'B' }],
                    projects: [{ id: '001', name: 'project' }],
                    items: [],
                    createdDate: expect.any(Date),
                    updatedDate: expect.any(Date)
                });
            });

            it('buildListData uses merges original object data with updated listName, headings or projects if passed', () => {
                expect(buildListData(originalObject, updatedListData)).toEqual({
                    _id: '123456',
                    listName: 'updatedListName',
                    headings: [{ id: '1', name: 'X' }, { id: '2', name: 'Y' }, { id: '3', name: 'Z' }],
                    projects: [{ id: '001', name: 'history' }],
                    items: [],
                    createdDate: expect.any(Date),
                    updatedDate: expect.any(Date)
                });
            });

            it('listSetupIsComplete returns true when headings and project data are complete', () => {
                expect(listSetupIsComplete(updatedListData, originalObject)).toEqual(true);
            });

            it('listSetupIsComplete returns false when headings are incomplete', () => {
                const incompleteListData = Object.assign({}, updatedListData, {
                    headings: [{ id: '1', name: '' }]
                });

                const incompleteOriginalObject = Object.assign({}, originalObject, {
                    headings: [{ id: '2', name: '' }]
                });

                expect(listSetupIsComplete(incompleteListData, incompleteOriginalObject)).toEqual(false);
            });

            it('listSetupIsComplete returns false when projects are incomplete', () => {
                const incompleteListData = Object.assign({}, updatedListData, {
                    projects: [{ id: '1', name: '' }]
                });

                const incompleteOriginalObject = Object.assign({}, originalObject, {
                    projects: [{ id: '2', name: '' }]
                });

                expect(listSetupIsComplete(incompleteListData, incompleteOriginalObject)).toEqual(false);
            });

            it('validateHeadings returns list of headings that contain a valid heading', () => {
                const mockHeadings = [
                    { id: '1', name: 'A' },
                    { id: '2', name: '' },
                    { id: '3', name: 'B' },
                    { id: '4', name: '' },
                ];
                expect(validateHeadings(mockHeadings)).toEqual([
                    { id: '1', name: 'A' }, { id: '3', name: 'B' }
                ]);
            });

            it('call to add headings results in a column being added to existing items', () => {
                const existingItems = [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'Name',
                                columnValue: 'IronMan'
                            },
                            {
                                columnName: 'Gender',
                                columnValue: 'Man'
                            }
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'Name',
                                columnValue: 'Black Widow'
                            },
                            {
                                columnName: 'Gender',
                                columnValue: 'Woman'
                            }
                        ]
                    }
                ];

                const addItems = addOrRemoveItems('add', existingItems);

                addItems.map((item) => {
                    expect(item.rowId).toEqual(expect.any(String));
                    expect(item.columns.length).toBe(3);
                    expect(item.columns[2].columnName).toEqual(expect.any(String));
                    expect(item.columns[2].columnValue).toEqual('');
                    return undefined;
                });
            });

            it('call to remove headings results in a column being removed from existing items', () => {
                const existingItems = [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'A',
                                columnValue: 'IronMan'
                            },
                            {
                                columnName: 'B',
                                columnValue: 'Man'
                            },
                            {
                                columnName: 'C',
                                columnValue: 'Red'
                            },
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'A',
                                columnValue: 'Black Widow'
                            },
                            {
                                columnName: 'B',
                                columnValue: 'Woman'
                            },
                            {
                                columnName: 'C',
                                columnValue: 'Black'
                            }
                        ]
                    }
                ];

                const removeItems = addOrRemoveItems('remove', existingItems, 1);
                expect(removeItems.length).toBe(2);

                removeItems.map((item) => {
                    expect(item.rowId).toEqual(expect.any(String));
                    expect(item.columns.length).toBe(2);
                    expect(item.columns[0].columnName).toEqual('A');
                    expect(item.columns[0].columnValue).toEqual(expect.any(String));
                    expect(item.columns[1].columnName).toEqual('C');
                    expect(item.columns[1].columnValue).toEqual(expect.any(String));
                    return undefined;
                });
            });

            it('call to addOrRemoveItems without a valid action results in no change', () => {
                const invalid = addOrRemoveItems('INVALID');
                expect(invalid).toBe(undefined);
            });
        });
    });
});
