const projects = (state = [], action) => {
  switch (action.type) {
      case 'CREATE_PROJECT':
          console.log('IN PROJECT REDUCER');
      return [
        ...state,
        {
          projectName: action.projectName,
          colour: action.colour
        }
      ]
    default:
      return state
  }
}

export default projects