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
    match: { params: { } }
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
    beforeEach(() => {
        wrapper = shallow(<UpdateProject
            result={{}}
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...props}
        />, { context });

        props.actions.create.mockClear();
    });

    it('calls componentWillMount', () => {
        const componentWillMountSpy = jest.spyOn(UpdateProject.prototype, 'componentWillMount');
        wrapper.instance().componentWillMount();

        expect(componentWillMountSpy).toHaveBeenCalled();
        expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
        expect(props.match.params.id).toBeUndefined();
        expect(props.actions.fetchSingleProject).not.toHaveBeenCalled();

        componentWillMountSpy.mockReset();
        componentWillMountSpy.mockRestore();
    });

    it('sets the projectName when the handleChange event is invoked', () => {
        const event = {
            target: {
                value: 'my-project-name'
            }
        };

        wrapper.instance().handleChange(event);

        expect(wrapper.state().projectName).toBe('my-project-name');
    });

    it('sets the colour when the handleDropDownSelection event is invoked', () => {
        wrapper.instance().handleDropDownSelection(mockEvent, { value: 'turquoise' });

        expect(wrapper.state().colour).toBe('turquoise');
    });

    it('calls the createOrUpdateProject action when handleSubmit is called', async () => {
        wrapper.instance().handleSubmit(mockEvent);
        expect(wrapper.instance().props.match.params).toEqual({});
        await expect(props.actions.create).toHaveBeenCalled();
        await expect(props.actions.addNotification).toHaveBeenCalled();
        await expect(props.actions.update).not.toHaveBeenCalled();
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
            projectName: 'Senor',
            colour: 'red'
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
            projectName: 'Senor',
            colour: 'red',
            createdDate: expect.anything()
        });
        await expect(props.actions.addNotification).toHaveBeenCalled();
    });

    it('calls createOrUpdateProject action with correct data when handleSubmit is called and projectName has been updated', async () => {
        const event = { target: { value: 'Senorita' } };

        updateProjectWrapper.instance().handleChange(event);
        updateProjectWrapper.instance().handleSubmit(mockEvent);

        await expect(updateProps.actions.update).toHaveBeenCalledWith({
            _id: '56789',
            projectName: 'Senorita',
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
            projectName: 'Senor',
            colour: 'blue',
            createdDate: expect.anything()
        });
        await expect(props.actions.addNotification).toHaveBeenCalled();
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
