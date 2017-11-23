import React from 'react';
import { shallow } from 'enzyme';
import { ManageList } from '../ManageList';

const mockSingleList = {
    _id: '123',
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
    headings: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }],
    items: [
        {
            rowId: '123',
            columns: [
                {
                    columnName: 'a',
                    columnValue: 'hola'
                },
                {
                    columnName: 'b',
                    columnValue: 'buenos dias'
                },
                {
                    columnName: 'c',
                    columnValue: 'como estas'
                }
            ]
        }
    ],
    createdDate: new Date()
};
const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const addItemMock = jest.fn();
const mockEvent = { preventDefault: jest.fn() };

const props = {
    actions: {
        retrieveListById: jest.fn(() => (
            Promise.resolve({ type: 'LIST_RETRIEVED', data: mockSingleList })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        )),
        update: jest.fn(() => (
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
            lists: { data: mockSingleList },
            match: { params: { id: '123' } }
        });
        beforeEach(() => {
            wrapper = shallow(
                <ManageList
                    handleChange={handleChangeMock}
                    handleSubmit={handleSubmitMock}
                    handleAddItem={addItemMock}
                    // list={mockSingleList}
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
                                columnName: 'Name',
                                columnValue: 'Hola'
                            }
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'Name',
                                columnValue: 'Como estas'
                            }
                        ]
                    }
                ]
            });
            const event = { target: { value: 'Hola Bella' } };

            wrapper.instance().handleChange(event, { id: '124', name: 'Name' });
            expect(wrapper.state().items).toEqual(
                [
                    {
                        rowId: '123',
                        columns: [
                            {
                                columnName: 'Name',
                                columnValue: 'Hola'
                            }
                        ]
                    },
                    {
                        rowId: '124',
                        columns: [
                            {
                                columnName: 'Name',
                                columnValue: 'Hola Bella'
                            }
                        ]
                    }
                ]
            );
        });

        it('calls handleChange but does not update items state if no value is present  - handleChange', async () => {
            const event = { target: { value: 'Change me ...' } };

            wrapper.instance().handleChange(event, { id: '124', name: 'Name' });
            expect(wrapper.state().items).toEqual([]);
        });

        it('calls updateList action with correct data when handleSubmit is called - handleSubmit', async () => {
            wrapper.setState({
                headings: [{ id: '9999', name: 'Name' }],
                projects: [{ id: '123', name: 'language' }],
                items: [{
                    rowId: '001',
                    columns: [
                        {
                            columnName: 'Name',
                            columnValue: 'Test'
                        }
                    ]
                }],
                listName: 'Languages'
            });
            await wrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.update).toHaveBeenCalledWith({
                _id: '123',
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date),
                headings: [{ id: '9999', name: 'Name' }],
                projects: [{ id: '123', name: 'language' }],
                items: [{
                    rowId: '001',
                    columns: [
                        {
                            columnName: 'Name',
                            columnValue: 'Test'
                        }
                    ]
                }],
                listName: 'Languages'
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
                                columnValue: 'Hola'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'buenos dias'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Como estas'
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
                                columnValue: 'Hola'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'buenos dias'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Como estas'
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
                                columnValue: 'Hola'
                            },
                            {
                                columnName: 'b',
                                columnValue: 'buenos dias'
                            },
                            {
                                columnName: 'c',
                                columnValue: 'Como estas'
                            }
                        ]
                    }
                ]
            });

            await wrapper.instance().handleDelete(mockEvent, { id: '123' });
            expect(wrapper.state().items).toEqual([]);
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
