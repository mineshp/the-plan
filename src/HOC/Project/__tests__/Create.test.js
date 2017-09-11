import React from 'react';
import { mount, shallow } from 'enzyme';
import { CreateProject, CreateProjectConnectedComponent } from '../Create';
import renderer from 'react-test-renderer';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();
const handleDropDownSelectionMock = jest.fn();

const createResult = {};
const store = {
  getState: () => ({
    result: { createResult }
  }),
  dispatch: () => {},
  subscribe: () => {},
};

describe('Create new project', () => {
  it('xxxx blah blah', () => {

  });
  // it('renders CreateProject component with approriate props from store', () => {

  //   const createProject = shallow(
  //     <CreateProjectConnectedComponent
  //       store={store}
  //     />).find(CreateProject);

  //   console.log("createProject prop", createProject);
  //   const actual = createProject.prop('result');
  //   expect(actual).toBe(createResult);
  // });
  it('2 + 2 equals 4', () => {
    expect(2 + 2).toBe(4);
  })
});
// const thunk = ({ dispatch, getState }) => next => action => {
//   if (typeof action === 'function') {
//     return action(dispatch, getState)
//   }

//   return next(action)
// }

// const create = () => {
//   const store = {
//     getState: jest.fn(() => ({})),
//     dispatch: jest.fn(),
//   };
//   const next = jest.fn()

//   const invoke = (action) => thunk(store)(next)(action)

//   return {store, next, invoke}
// };

// describe('Create a new project', () => {
//   it('renders a Create project form', () => {
//     const createWrapper = shallow(<Create />);

//     console.log("create wrapper", createWrapper);
//   });

  // it('displays error message, when action returns an error', () => {

  // });

  // it('displays success message, when action returns a success', () => {

  // });

  // it('calls the create action on handlesubmit', () => {

  // });

  // it('handlechange sets the projectName in state', () => {

  // });

  // it('handleDropDown sets the colour in state', () => {

  // });


    // it(`passes through non-function action`, () => {
    //     const { next, invoke } = create()
    //     const action = {type: 'HELLO'}
    //     invoke(action)
    //     expect(next).toHaveBeenCalledWith(action)
    // })

// });