import React from 'react';
import { shallow } from 'enzyme';
import { ManageList } from '../ManageList';

const mockSingleList = {
    _id: '001',
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
        { id: 1, name: 'hola', position: 1 },
        { id: 2, name: 'buenos dias', position: 2 },
        { id: 3, name: 'como estas', position: 3 }
    ]
};

const props = {
    actions: {
        retrieveListById: jest.fn(() => (
            Promise.resolve(mockSingleList)
        ))
    },
    match: { }
};

describe('Manage Single List', () => {
    describe('Retrieve a single list success', () => {
        let wrapper;
        const propsWithParamId = Object.assign({}, props, { match: { params: { id: '123' } } });
        beforeEach(() => {
            wrapper = shallow(<ManageList {...propsWithParamId} />);
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
            wrapper = shallow(<ManageList {...props} />);
        });

        it('fails to call fetchListById when no params are provided', async () => {
            wrapper.instance().componentDidMount();

            expect(props.match.params).toBe(undefined);
            expect(wrapper.instance().fetchListById()).toBe(undefined);
        });
    });
});
