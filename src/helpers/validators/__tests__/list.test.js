import { buildListData, listSetupIsComplete, validateHeadings } from '../list';

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
        });
    });
});
