import React from 'react';
import { shallow } from 'enzyme';
import { UpdateList } from '../Update';
import LoadingComponent from '../../../components/Shared/Loading';
import { mockUpdateSingleList } from '../../../helpers/test/testData/listData';

const mockList = mockUpdateSingleList();

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();
const handleHeaderInputChangeMock = jest.fn();
const addHeadingMock = jest.fn();
const removeHeadingMock = jest.fn();

const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({
                type: 'LIST_CREATION_SUCCESS'
            })
        )),
        update: jest.fn(() => (
            Promise.resolve({
                type: 'LIST_UPDATE_SUCCESS'
            })
        )),
        listProjects: jest.fn(() => (
            Promise.resolve({
                type: 'PROJECT_LIST_RETRIEVED'
            })
        )),
        retrieveListById: jest.fn(() => (
            Promise.resolve({
                type: 'LIST_RETRIEVED',
                data: mockList
            })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve(Promise.resolve())
        ))
    },
    authentication: {
        user: { username: 'testUser' }
    },
    projectOptions: [
        {
            key: 1,
            value: 'TEST1',
            text: 'TEST1'
        },
        {
            key: 2,
            value: 'TEST2',
            text: 'TEST2'
        }
    ],
    headings: [{ id: '999', name: 'TestHeading' }],
    match: { params: {} }
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

const mockEvent = { preventDefault: jest.fn() };

describe('Update or Create List', () => {
    describe('Create new list', () => {
        let createWrapper;
        beforeEach(() => {
            createWrapper = shallow(<UpdateList
                result={{}}
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleHeaderInputChange={handleHeaderInputChangeMock}
                addHeading={addHeadingMock}
                removeHeading={removeHeadingMock}
                headings={[]}
                {...props}
            />, { context });

            props.actions.create.mockClear();
            props.actions.update.mockClear();
            props.actions.listProjects.mockClear();
            props.actions.addNotification.mockClear();
        });

        it('calls componentWillMount', () => {
            const componentWillMountSpy = jest.spyOn(UpdateList.prototype, 'componentWillMount');
            createWrapper.instance().componentWillMount();

            expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
            expect(props.match.params.id).toBeUndefined();
            expect(props.actions.listProjects).toHaveBeenCalled();
            expect(props.actions.retrieveListById).not.toHaveBeenCalled();

            componentWillMountSpy.mockReset();
            componentWillMountSpy.mockRestore();
        });

        it('does not call createOrUpdateList when handleSubmit is called and form setup is not complete', async () => {
            createWrapper.setState({
                listName: 'testList'
            });
            createWrapper.instance().handleSubmit(mockEvent);
            expect(createWrapper.instance().props.match.params).toEqual({});
            await expect(props.actions.create).not.toHaveBeenCalled();
            await expect(props.actions.update).not.toHaveBeenCalled();
            await expect(props.actions.addNotification).not.toHaveBeenCalled();
            await expect(context.router.history.push).not.toHaveBeenCalled();
        });

        it('if no valid projects exist when handleSubmit is called and form setup is complete', async () => {
            createWrapper.setState({
                listName: 'testList',
                headings: [
                    {
                        id: '123', name: 'name'
                    }
                ],
                projects: []
            });
            createWrapper.instance().handleSubmit(mockEvent);
            expect(createWrapper.instance().props.match.params).toEqual({});
            await expect(props.actions.create).not.toHaveBeenCalled();
            await expect(props.actions.update).not.toHaveBeenCalled();
            await expect(props.actions.addNotification).not.toHaveBeenCalled();
            await expect(context.router.history.push).not.toHaveBeenCalled();
        });

        it('calls setupNewList action when handleSubmit is called and form setup is complete', async () => {
            createWrapper.setState({
                listName: 'Avengers Assemble',
                owner: 'testUser',
                headings: [
                    {
                        id: '123', name: 'Film'
                    }
                ],
                projects: [
                    {
                        id: '001', name: 'Avengers'
                    }
                ]
            });
            createWrapper.instance().handleSubmit(mockEvent);
            expect(createWrapper.instance().props.match.params).toEqual({});
            await expect(props.actions.create).toHaveBeenCalled();
            await expect(props.actions.update).not.toHaveBeenCalled();
            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and listName has been created - handleChange', async () => {
            createWrapper.setState({
                headings: [{ id: '123', name: 'name' }],
                projects: [{ id: '123', name: 'superheroes' }]
            });
            const event = { target: { value: 'Avengers' } };

            createWrapper.instance().handleChange(event);
            createWrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.create).toHaveBeenCalledWith({
                listName: 'Avengers',
                owner: 'testUser',
                headings: [{ id: '123', name: 'name' }],
                projects: [{ id: '123', name: 'superheroes' }]
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and the headings have been created - handleHeaderInputChange', async () => {
            createWrapper.setState({
                headings: [{ id: '9999', name: '' }],
                projects: [{ id: '123', name: 'superheroes' }],
                listName: 'Avengers',
                owner: 'testUser'
            });
            const event = { target: { value: 'description' } };
            createWrapper.instance().handleHeaderInputChange(event, { id: '9999' });
            await createWrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.create).toHaveBeenCalledWith({
                listName: 'Avengers',
                owner: 'testUser',
                headings: [{ id: '9999', name: 'description' }],
                projects: [{ id: '123', name: 'superheroes' }]
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls handleHeaderInputChange with empty headings data, the empty headings are discarded', async () => {
            createWrapper.setState({
                headings: [{ id: '1', name: 'Name' }, { id: '2', name: '' }, { id: '3', name: 'Desc' }],
                projects: [{ id: '123', name: 'superheroes' }],
                listName: 'Avengers',
                owner: 'testUser'
            });

            await createWrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.create).toHaveBeenCalledWith({
                listName: 'Avengers',
                owner: 'testUser',
                headings: [{ id: '1', name: 'Name' }, { id: '3', name: 'Desc' }],
                projects: [{ id: '123', name: 'superheroes' }]
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and projects have been created - handleDropDownSelection', async () => {
            createWrapper.setState({
                headings: [
                    {
                        id: '9999', name: 'name'
                    }
                ],
                listName: 'Avengers',
            });
            createWrapper.instance().handleDropDownSelection(mockEvent, { value: ['movies'] });
            await createWrapper.instance().handleSubmit(mockEvent);

            await expect(props.actions.create).toHaveBeenCalledWith({
                listName: 'Avengers',
                owner: 'testUser',
                headings: [{ id: '9999', name: 'name' }],
                projects: [
                    {
                        id: expect.any(String),
                        name: 'movies'
                    }
                ]
            });
            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls addHeading when new heading is required', () => {
            createWrapper.setState({
                headings: [
                    {
                        id: '1', name: 'A'
                    }
                ]
            });

            createWrapper.instance().addHeading();
            expect(createWrapper.state().headings).toEqual([
                {
                    id: '1', name: 'A'
                },
                {
                    id: expect.any(String),
                    name: ''
                }
            ]);
        });

        it('calls removeHeading and deletes specified heading when an existing heading is deleted', () => {
            createWrapper.setState({
                headings: [
                    {
                        id: '1', name: 'A'
                    },
                    {
                        id: '2', name: 'B'
                    }
                ]
            });

            createWrapper.instance().removeHeading(mockEvent, { id: '2' });
            expect(createWrapper.state().headings).toEqual([
                {
                    id: '1', name: 'A'
                }
            ]);
        });

        it('calls removeHeading and does not delete any heading when a non-existent heading is deleted', () => {
            createWrapper.setState({
                headings: [
                    {
                        id: '1', name: 'A'
                    },
                    {
                        id: '2', name: 'B'
                    }
                ]
            });

            createWrapper.instance().removeHeading(mockEvent, { id: '3' });
            expect(createWrapper.state().headings).toEqual([
                {
                    id: '1', name: 'A'
                },
                {
                    id: '2', name: 'B'
                }
            ]);
        });
    });

    describe('Update existing list', () => {
        const updateParams = {
            match: { params: { id: '123' } },
            result: {
                _id: '12345678',
                listName: 'Avengers',
                headings: [{ name: 'A' }, { name: 'B' }],
                createdDate: new Date(),
                projects: [{
                    id: '12345',
                    name: 'superheroes'
                }]
            }
        };

        const updateProps = Object.assign({}, props, updateParams);
        let updateListWrapper;

        beforeEach(() => {
            updateListWrapper = shallow(<UpdateList
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
                handleDropDownSelection={handleDropDownSelectionMock}
                handleHeaderInputChange={handleHeaderInputChangeMock}
                addHeading={addHeadingMock}
                removeHeading={removeHeadingMock}
                headings={[]}
                {...updateProps}
            />, { context });

            updateProps.actions.update.mockClear();
        });

        it('calls componentWillMount', () => {
            const componentWillMountUpdateSpy = jest.spyOn(UpdateList.prototype, 'componentWillMount');
            updateListWrapper.instance().componentWillMount();

            expect(componentWillMountUpdateSpy).toHaveBeenCalledTimes(1);
            expect(updateProps.actions.listProjects).toHaveBeenCalled();
            expect(updateProps.match.params.id).toEqual('123');
            expect(updateProps.actions.retrieveListById).toHaveBeenCalled();
            expect(updateListWrapper.state().headings).toEqual([
                { id: '1', name: 'Name' }, { id: '2', name: 'Role' }
            ]);

            componentWillMountUpdateSpy.mockReset();
            componentWillMountUpdateSpy.mockRestore();
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and listName has been updated - handleChange', async () => {
            const event = { target: { value: 'Avengers - Age of Ultron' } };

            updateListWrapper.instance().handleChange(event);
            updateListWrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '12345678',
                listName: 'Avengers - Age of Ultron',
                headings: [{ id: '1', name: 'Name' }, { id: '2', name: 'Role' }],
                projects: [{ id: '12345', name: 'superheroes' }],
                items: undefined,
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date)
            });
            await expect(updateProps.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and the headings have been updated - handleHeaderInputChange', async () => {
            const event = { target: { value: 'C' } };
            updateListWrapper.instance().handleHeaderInputChange(event, { id: '2' });
            await updateListWrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '12345678',
                listName: 'Avengers',
                headings: [{ id: '1', name: 'Name' }, { id: '2', name: 'C' }],
                projects: [{ id: '12345', name: 'superheroes' }],
                items: undefined,
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date)
            });
            await expect(updateProps.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls handleHeaderInputChange with empty headings data, headings are not set', async () => {
            updateListWrapper.setState({
                headings: [
                    {
                        id: '1', name: 'A'
                    }
                ]
            });

            const event = { target: { value: '' } };
            updateListWrapper.instance().handleHeaderInputChange(event, { id: '2' });
            await updateListWrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '12345678',
                listName: 'Avengers',
                headings: [{ id: '1', name: 'A' }],
                projects: [{ id: '12345', name: 'superheroes' }],
                items: undefined,
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date)
            });
            await expect(updateProps.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls createOrUpdateList action with correct data when handleSubmit is called and projects have been updated - handleDropDownSelection', async () => {
            updateListWrapper.instance().handleDropDownSelection(mockEvent, { value: ['movies', 'shield'] });
            await updateListWrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '12345678',
                listName: 'Avengers',
                headings: [{ id: '1', name: 'Name' }, { id: '2', name: 'C' }],
                projects: [
                    {
                        id: expect.any(String),
                        name: 'movies'
                    },
                    {
                        id: expect.any(String),
                        name: 'shield'
                    }
                ],
                items: undefined,
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date)
            });
            await expect(updateProps.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });

        it('calls updateList and generates correct object data to send to update action', async () => {
            updateListWrapper.setState({
                headings: [],
                projects: []
            });

            await updateListWrapper.instance().handleSubmit(mockEvent);

            await expect(updateProps.actions.update).toHaveBeenCalledWith({
                _id: '12345678',
                listName: 'Avengers',
                headings: [{ name: 'A' }, { name: 'B' }],
                projects: [{ name: 'superheroes', id: '12345' }],
                items: undefined,
                createdDate: expect.any(Date),
                updatedDate: expect.any(Date)
            });
            await expect(updateProps.actions.addNotification).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/list/all');
        });
    });

    describe('Render loading', () => {
        let updateListWithNoResultsWrapper;
        let noResultProps;
        beforeEach(() => {
            noResultProps = {
                actions: {
                    create: jest.fn(() => (Promise.resolve())),
                    listProjects: jest.fn(() => (Promise.resolve())),
                    retrieveListById: jest.fn(() => (Promise.resolve())),
                    update: jest.fn(() => (Promise.resolve())),
                    addNotification: jest.fn(() => (Promise.resolve()))
                },
                authentication: { user: { username: 'testUser' } },
                projectOptions: [{
                    id: '1'
                }],
                match: { params: {} }
            };

            updateListWithNoResultsWrapper = shallow(<UpdateList
                {...noResultProps}
            />, { context });
        });

        it('shows loading data when no results exist', () => {
            expect(updateListWithNoResultsWrapper.contains(<LoadingComponent />)).toBe(true);
        });

        it('shows loading data when no projectOptions exist', () => {
            const noProjectOptionsProps = Object.assign({}, noResultProps, {
                result: {
                    _id: '123'
                },
                projectOptions: []
            });

            const updateListWithNoProjectOptionsWrapper = shallow(<UpdateList
                {...noProjectOptionsProps}
            />, { context });
            expect(updateListWithNoProjectOptionsWrapper.contains(<LoadingComponent />)).toBe(true);
        });
    });
});
