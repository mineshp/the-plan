import React from 'react';
import { shallow } from 'enzyme';
import { UpdateProject } from '../Update';
import LoadingComponent from '../../../components/Shared/Loading';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();
const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({
                type: 'PROJECT_CREATION_SUCCESS'
            })
        )),
        update: jest.fn(() => (
            Promise.resolve({
                type: 'PROJECT_UPDATE_SUCCESS'
            })
        )),
        fetchSingleProject: jest.fn(() => (
            Promise.resolve({})
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    match: { params: {} },
    notification: null
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};
const mockEvent = { preventDefault: jest.fn() };

describe('Create new project', () => {
    let wrapper;
    const newProjectProps = Object.assign({}, props, {
        notification: {
            message: 'Project created',
            level: 'success',
            title: 'success'
        }
    });
    beforeEach(() => {
        wrapper = shallow(<UpdateProject
            result={{}}
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...newProjectProps}
        />, { context });

        newProjectProps.actions.create.mockClear();
    });

    it('calls componentWillMount', () => {
        const componentWillMountSpy = jest.spyOn(UpdateProject.prototype, 'componentWillMount');
        wrapper.instance().componentWillMount();

        expect(componentWillMountSpy).toHaveBeenCalled();
        expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
        expect(newProjectProps.match.params.id).toBeUndefined();
        expect(newProjectProps.actions.fetchSingleProject).not.toHaveBeenCalled();

        componentWillMountSpy.mockReset();
        componentWillMountSpy.mockRestore();
    });

    it('sets the projectName when the handleChange event is invoked', () => {
        const event = {
            target: {
                value: 'Black Widow'
            }
        };

        wrapper.instance().handleChange(event);

        expect(wrapper.state().projectName).toBe('Black Widow');
    });

    it('sets the colour when the handleDropDownSelection event is invoked', () => {
        wrapper.instance().handleDropDownSelection(mockEvent, { value: 'black' });

        expect(wrapper.state().colour).toBe('black');
    });

    it('calls the createOrUpdateProject action when handleSubmit is called', async () => {
        wrapper.instance().handleSubmit(mockEvent);
        expect(wrapper.instance().props.match.params).toEqual({});
        await expect(newProjectProps.actions.create).toHaveBeenCalled();
        await expect(newProjectProps.actions.addNotification).toHaveBeenCalledWith({
            message: 'Project created',
            level: 'success',
            title: 'success'
        });
        await expect(newProjectProps.actions.update).not.toHaveBeenCalled();
    });

    it('calls the redirect method when the createOrUpdateProject actions returns successfully', async () => {
        wrapper.instance().handleSubmit(mockEvent);
        await expect(context.router.history.push).toHaveBeenCalledWith('/project/all');
    });
});

describe('Update existing project', () => {
    const updateParams = {
        match: { params: { id: '56789' } },
        result: {
            _id: '56789',
            projectName: 'Hawkeye',
            colour: 'red'
        },
        notification: {
            message: 'Project updated',
            level: 'success',
            title: 'success'
        }
    };

    const updateProps = Object.assign({}, props, updateParams);
    let updateProjectWrapper;

    beforeEach(() => {
        updateProjectWrapper = shallow(<UpdateProject
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...updateProps}
        />, { context });

        updateProps.actions.update.mockClear();
    });

    it('calls componentWillMount', () => {
        const componentWillMountUpdateSpy = jest.spyOn(UpdateProject.prototype, 'componentWillMount');
        updateProjectWrapper.instance().componentWillMount();

        expect(componentWillMountUpdateSpy).toHaveBeenCalled();
        expect(componentWillMountUpdateSpy).toHaveBeenCalledTimes(1);
        expect(updateProps.match.params.id).not.toBeUndefined();
        expect(updateProps.actions.fetchSingleProject).toHaveBeenCalled();

        componentWillMountUpdateSpy.mockReset();
        componentWillMountUpdateSpy.mockRestore();
    });

    it('calls createOrUpdateProject action with correct data when handleSubmit is called but no changes have been made', async () => {
        updateProjectWrapper.instance().handleSubmit(mockEvent);

        await expect(updateProps.actions.update).toHaveBeenCalledWith({
            _id: '56789',
            projectName: 'Hawkeye',
            colour: 'red',
            createdDate: expect.anything()
        });
        await expect(props.actions.addNotification).toHaveBeenCalled();
    });

    it('calls createOrUpdateProject action with correct data when handleSubmit is called and projectName has been updated', async () => {
        const event = { target: { value: 'Black Panther' } };

        updateProjectWrapper.instance().handleChange(event);
        updateProjectWrapper.instance().handleSubmit(mockEvent);

        await expect(updateProps.actions.update).toHaveBeenCalledWith({
            _id: '56789',
            projectName: 'Black Panther',
            colour: 'red',
            createdDate: expect.anything()
        });
        await expect(props.actions.addNotification).toHaveBeenCalled();
    });

    it('calls createOrUpdateProject action with correct data when handleSubmit is called and the colour has been updated', async () => {
        updateProjectWrapper.instance().handleDropDownSelection(mockEvent, { value: 'blue' });
        await updateProjectWrapper.instance().handleSubmit(mockEvent);

        await expect(updateProps.actions.update).toHaveBeenCalledWith({
            _id: '56789',
            projectName: 'Hawkeye',
            colour: 'blue',
            createdDate: expect.anything()
        });
        await expect(props.actions.addNotification).toHaveBeenCalledWith({
            message: 'Project updated',
            level: 'success',
            title: 'success'
        });
    });

    it('calls the redirect method when the createOrUpdateProject actions returns successfully', async () => {
        updateProjectWrapper.setState({
            projectName: 'some other project name',
            colour: 'green'
        });
        updateProjectWrapper.instance().handleSubmit(mockEvent);
        await expect(context.router.history.push).toHaveBeenCalledWith('/project/all');
    });
});

describe('calls fail due to user not being logged in', () => {
    let wrapper;
    let propsActions;

    beforeEach(() => {
        props.actions.addNotification.mockReset();
        propsActions = Object.assign({}, {
            create: jest.fn(() => (
                Promise.resolve({
                    error: 'oh-no'
                })
            )),
            update: jest.fn(() => (
                Promise.resolve({
                    error: 'oh-dear'
                })
            )),
            fetchSingleProject: jest.fn(() => (
                Promise.resolve({})
            )),
            addNotification: jest.fn(() => (
                Promise.resolve()
            ))
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('creates a project', async () => {
        const updateProps = Object.assign({}, props, {
            actions: propsActions
        });

        wrapper = shallow(<UpdateProject
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...updateProps}
        />, { context });

        wrapper.instance().createOrUpdateProject();
        await expect(updateProps.actions.create).toHaveBeenCalled();
        await expect(updateProps.actions.update).not.toHaveBeenCalled();
        await expect(updateProps.actions.addNotification).toHaveBeenCalledWith({
            message: 'oh-no',
            level: 'error',
            title: 'Unknown Error'
        });
    });

    it('updates a project', async () => {
        const updateProps = Object.assign({}, props, {
            actions: propsActions,
            result: { _id: '1234' }
        });

        wrapper = shallow(<UpdateProject
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...updateProps}
        />, { context });

        wrapper.instance().createOrUpdateProject();
        await expect(updateProps.actions.update).toHaveBeenCalled();
        await expect(updateProps.actions.create).not.toHaveBeenCalled();
        await expect(updateProps.actions.addNotification).toHaveBeenCalledWith({
            message: 'oh-dear',
            level: 'error',
            title: 'Unknown Error'
        });
    });
});

describe('Render loading', () => {
    let updateProjectWithNoResultsWrapper;

    beforeEach(() => {
        updateProjectWithNoResultsWrapper = shallow(<UpdateProject
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...props}
        />, { context });

        props.actions.update.mockClear();
    });

    it('shows loading data when no results exist', () => {
        expect(updateProjectWithNoResultsWrapper.contains(<LoadingComponent />)).toBe(true);
    });
});
