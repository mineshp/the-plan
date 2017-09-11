import * as actions from '../project';
import { create } from '../project';

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('Project actions', () => {
  it('should dispatch an action to create a new project', () => {
    const expectedAction = {
        type: 'CREATE_PROJECT',
        projectName: 'newProjectName',
        colour: 'blue'
    };
    expect(
      actions.createProject('newProjectName', 'blue')
    ).toEqual(expectedAction);
  });

  it('should dispatch an action to notify the user a project has been created', () => {
      const mockNewProjectCreationSuccessAPIResponse = {
          _id: "1234",
          projectName: "TEST PROJECT",
          colour: "green",
          createdDate: "2017-08-15T12:02:00.000Z"
      };

      const expectedAction = {
        type: 'PROJECT_CREATION_SUCCESS',
        data: mockNewProjectCreationSuccessAPIResponse
      };

      expect(
        actions.createdProject(mockNewProjectCreationSuccessAPIResponse)
      ).toEqual(expectedAction);
  });

  it('should return a successful response when create project called', async () => {
      const mockNewProjectCreationSuccessAPIResponse = {
          _id: "1234",
          projectName: "TEST PROJECT",
          colour: "green",
          createdDate: "2017-08-15T12:02:00.000Z"
      };

      window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(
                200, null, JSON.stringify(mockNewProjectCreationSuccessAPIResponse) )));

      // test method create(newProject)

      // console.log('ss', create({
      //     projectName: 'TEST PROJECT',
      //     colour: 'green'
      // }).resolves);

      // console.log(create({a: 'bb'}).then());

      // await expect(
      //   create({
      //     projectName: 'TEST PROJECT',
      //     colour: 'green'
      // })).resolves.toEqual('blah');
  });

  it('should dispatch an action to notify the user a project has failed to created', () => {
      const mockNewProjectCreationFailureAPIResponse = {
          message: 'Error creating project'
      };

      const expectedAction = {
        type: 'PROJECT_CREATION_ERROR',
        error: mockNewProjectCreationFailureAPIResponse.message
      };

      expect(
        actions.errorCreatingProject(mockNewProjectCreationFailureAPIResponse.message)
      ).toEqual(expectedAction);
  });
});