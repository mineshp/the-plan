//import { push } from 'react-router-redux';

export const createProject = (projectName, colour) => ({
    type: 'CREATE_PROJECT',
    projectName,
    colour
});

export const createdProject = (data) => ({
  type: 'PROJECT_CREATION_SUCCESS',
  data
});

export const errorCreatingProject = (error) => ({
  type: 'PROJECT_CREATION_ERROR',
  error
});

export function create(newProject) {
  let responseStatus;
  return dispatch =>
    fetch('/project/create', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectName: newProject.projectName,
        colour: newProject.colour.toLowerCase()
      }),
    })
      .then((res) => {
        responseStatus = res.ok;
        return res.json();
      })
      .then((data) => {
        if (responseStatus) {
          return dispatch(createdProject(data));
        }
        else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        dispatch(errorCreatingProject(error.message));
    });
}
