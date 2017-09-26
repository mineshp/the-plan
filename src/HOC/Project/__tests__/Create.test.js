import React from 'react';
import { shallow } from 'enzyme';
import { CreateProject } from '../Create';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();
const props = { actions: { create: jest.fn() } };

describe('Create Project Component', () => {
    const wrapper = shallow(<CreateProject
        result={{}}
        handleChange={handleChangeMock}
        handleDropDownSelection={handleDropDownSelectionMock}
        handleSubmit={handleSubmitMock}
        projectName="A new project"
        {...props}
    />);

    it('sets initial state correctly', () => {
        expect(wrapper.state()).toEqual({ projects: null, shouldRedirect: false });
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
        const event = {
            preventDefault: jest.fn()
        };
        wrapper.instance().handleDropDownSelection(event, { value: 'turquoise' });
        expect(wrapper.state().colour).toBe('turquoise');
    });

    it('calls the create action when the handleSubmit event is invoked', () => {
        const mockEvent = {
            preventDefault: jest.fn()
        };

        wrapper.instance().handleSubmit(mockEvent);
        expect(props.actions.create).toHaveBeenCalledWith(wrapper.state());
    });
});
