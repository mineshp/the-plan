import React from 'react';
import { shallow } from 'enzyme';
import { ManageList } from '../ManageList';
import { mockSingleList } from '../../../helpers/test/testData/listData';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const addItemMock = jest.fn();
const mockEvent = { preventDefault: jest.fn() };
const mockDownloadPDF = jest.fn();

const props = {
    actions: {
        retrieveListById: jest.fn(() => (
            Promise.resolve({ type: 'LIST_RETRIEVED', data: mockSingleList() })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        )),
        update: jest.fn(() => (
            Promise.resolve()
        )),
        downloadPDF: jest.fn(() => (
            Promise.resolve()
        ))
    },
    match: { }
};

describe('Manage Single List', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Retrieve a single list successful', () => {
        let wrapper;
        const propsWithParamId = Object.assign({}, props, {
            lists: { data: mockSingleList() },
            match: { params: { id: '123' } }
        });
        beforeEach(() => {
            wrapper = shallow(
                <ManageList
                    handleChange={handleChangeMock}
                    handleSubmit={handleSubmitMock}
                    handleAddItem={addItemMock}
                    {...propsWithParamId}
                />
            );
        });

        it('calls componentDidMount', async () => {
            const componentDidMountSpy = jest.spyOn(ManageList.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
            expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
        });

        it('calls the retrieveListById action when the fetchListById function is invoked', async () => {
            wrapper.instance().fetchListById(propsWithParamId.match.params.id);
            await expect(propsWithParamId.actions.retrieveListById).toHaveBeenCalledWith('123');
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('sets the updated items when handleChange is called for updating items  - handleChange', async () => {
            wrapper.setState({
                items: [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Black Panther'
                            }
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'b',
                                columnValue: 'Black Widow'
                            }
                        ]
                    }
                ]
            });
            const event = { target: { value: 'Hawkeye' } };

            wrapper.instance().handleChange(event, { id: '124', name: 'b' });
            expect(wrapper.state().items).toEqual(
                [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Black Panther'
                            }
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'b',
                                columnValue: 'Hawkeye'
                            }
                        ]
                    }
                ]
            );
        });

        it('calls handleChange but does not update items state if no value is present  - handleChange', async () => {
            const event = { target: { value: 'Change me ...' } };

            wrapper.instance().handleChange(event, { id: '124', name: 'b' });
            expect(wrapper.state().items).toEqual([]);
        });

        it('calls updateList action with correct data when handleSubmit is called - handleSubmit', async () => {
            wrapper.setState({
                headings: [{ id: '1', name: 'Name' }],
                projects: [{ id: '2', name: 'Avengers' }],
                items: [{
                    rowId: '001',
                    columns: [
                        {
                            columnName: 'Name',
                            columnValue: 'Antman'
                        }
                    ]
                }],
                listName: 'Superheroes'
            });
            await wrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.update).toHaveBeenCalledWith({
                _id: '123',
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date),
                headings: [{ id: '1', name: 'Name' }],
                projects: [{ id: '2', name: 'Avengers' }],
                items: [{
                    rowId: '001',
                    columns: [
                        {
                            columnName: 'Name',
                            columnValue: 'Antman'
                        }
                    ]
                }],
                listName: 'Superheroes'
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        it('calls addItem when add new row item button is clicked', async () => {
            wrapper.setState({
                items: [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Thor'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'Captain America'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Iron Man'
                            }
                        ]
                    }
                ]
            });

            await wrapper.instance().addItem();
            expect(wrapper.state().items).toEqual(
                [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Thor'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'Captain America'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Iron Man'
                            }
                        ]
                    },
                    {
                        rowId: expect.any(String),
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'edit'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'edit'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'edit'
                            }
                        ]
                    }
                ]
            );
        });

        it('calls handleDelete when delete item row item button is clicked', async () => {
            wrapper.setState({
                items: [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Thor'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'Captain America'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Iron Man'
                            }
                        ]
                    }
                ]
            });

            await wrapper.instance().handleDelete(mockEvent, { id: '123' });
            expect(wrapper.state().items).toEqual([]);
        });

        it('calls handleCompleted when marking item as completed when the item row completed button is clicked', async () => {
            wrapper.setState({
                items: [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Thor'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'Captain America'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Iron Man'
                            }
                        ]
                    }
                ]
            });

            await wrapper.instance().handleCompleted(mockEvent, { id: '123' });
            expect(wrapper.state().items[0].completed).toEqual(true);
        });

        it('calls handleCompleted when marking existing completed item as un-completed when the item row completed button is clicked', async () => {
            wrapper.setState({
                items: [
                    {
                        rowId: '123',
                        completed: true,
                        columns: [
                            {
                                columnName: 'a',
                                columnValue: 'Thor'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'Captain America'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Iron Man'
                            }
                        ]
                    }
                ]
            });

            await wrapper.instance().handleCompleted(mockEvent, { id: '123' });
            expect(wrapper.state().items[0].completed).toEqual(false);
        });
    });

    describe('Download a pdf', () => {
        let wrapper;
        const propsWithParamId = Object.assign({}, props, {
            lists: { data: mockSingleList() },
            match: { params: { id: '123' } },
            actions: Object.assign({}, props.actions, {
                downloadPDF: jest.fn(() => (
                    Promise.resolve({
                        data: mockSingleList(),
                        isFetching: false
                    })
                ))
            })
        });
        beforeEach(() => {
            wrapper = shallow(
                <ManageList
                    handleChange={handleChangeMock}
                    handleSubmit={handleSubmitMock}
                    handleAddItem={addItemMock}
                    downloadPDF={mockDownloadPDF}
                    {...propsWithParamId}
                />
            );
        });
        it('calls downloadPDF action with correct data when downloadPDF is called - downloadPDF', async () => {
            await wrapper.instance().downloadPDF(mockEvent, { id: '123' });

            await expect(propsWithParamId.actions.downloadPDF).toHaveBeenCalledWith('123');
            await expect(props.actions.addNotification).toHaveBeenCalled();
        });
    });

    describe('Retrieve a single list fails', () => {
        it('sets an api error when the client is unable to connect to the api', async () => {
            const apiError = {
                error: {
                    isError: true,
                    message: 'Unable to retrieve a single list, please try again later.'
                }
            };
            const propsAfterFetchSingleListError = Object.assign({}, props, { lists: { error: apiError } });
            const ManageListComponent = shallow(<ManageList {...propsAfterFetchSingleListError} />);

            expect(ManageListComponent.props().result).toBe(undefined);
        });
    });

    describe('Api call to retrieve list is not made if no params are sent', () => {
        let wrapper;
        beforeEach(() => {
            const noListDataProps = Object.assign({}, props, { lists: {} });
            wrapper = shallow(<ManageList {...noListDataProps} />);
        });

        it('fails to call fetchListById when no params are provided', async () => {
            const componentDidMountSpy = jest.spyOn(ManageList.prototype, 'componentDidMount');
            await wrapper.instance().componentDidMount();
            expect(componentDidMountSpy).toHaveBeenCalled();
            expect(props.match.params).toBe(undefined);
            await expect(props.actions.retrieveListById).not.toHaveBeenCalled();
            await expect(props.actions.addNotification).not.toHaveBeenCalled();
            expect(wrapper.instance().fetchListById()).toBe(undefined);
        });
    });
});
