const projects = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return {
        projectName: action.projectName,
        colour: action.colour
      };

      case 'PROJECT_CREATION_SUCCESS':
        return {
          success: {
            data: action.data,
            message: 'Successfully created project'
          }
        };

      case 'PROJECT_CREATION_ERROR':
        return {
          error: {
            message: action.error,
            isError: true
          }
        };

      default:
        return state
  }
}

export default projects;