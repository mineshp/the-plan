export const createProject = (projectName, colour) => ({
    type: 'CREATE_PROJECT',
    projectName,
    colour
});

export const createdProject = (data) => ({
  type: 'PROJECT_CREATION_SUCCESS',
});

export const errorCreatingProject = (error) => ({
  type: 'PROJECT_CREATION_ERROR',
  error: error
});

export function create(newProject) {
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
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(createdProject(response));
      } else {
        const error = new Error(`
          Error creating project ${newProject.projectName} with colour ${newProject.colour}, Error: ${response.statusText}`
        );
        error.response = response;
        dispatch(errorCreatingProject(error));
        throw error;
      }
    })
    .catch(error => { console.log('request failed', error); });
}