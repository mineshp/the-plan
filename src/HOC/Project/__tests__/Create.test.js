import React from 'react';
import { shallow } from 'enzyme';
import { CreateProject } from '../Create';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();
const props = {
    actions: {
        create: jest.fn(() => (
            Promise.resolve({
                type: 'PROJECT_CREATION_SUCCESS'
            })
        ))
    }
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

describe('Create Project Component', () => {
    const wrapper = shallow(<CreateProject
        result={{}}
        handleChange={handleChangeMock}
        handleDropDownSelection={handleDropDownSelectionMock}
        handleSubmit={handleSubmitMock}
        projectName="A new project"
        {...props}
    />, { context });

    const mockEvent = { preventDefault: jest.fn() };

    it('sets initial state correctly', () => {
        expect(wrapper.state()).toEqual({ projects: null });
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

    it('calls the create action when handleSubmit is called', async () => {
        const CreateProjectComponent = shallow(<CreateProject
            result={{}}
            handleChange={handleChangeMock}
            handleDropDownSelection={handleDropDownSelectionMock}
            handleSubmit={handleSubmitMock}
            projectName="A new project"
            {...props}
        />, { context });

        CreateProjectComponent.instance().handleSubmit(mockEvent);
        await expect(props.actions.create).toHaveBeenCalled();
    });

    it('calls the redirect method when the create actions returns successfully', async () => {
        wrapper.instance().handleSubmit(mockEvent);
        await expect(context.router.history.push).toHaveBeenCalledWith('/project/all');
    });
});
