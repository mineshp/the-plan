import { combineReducers } from 'redux';
import projects from './projects';

const thePlanApp = combineReducers({
    projects
});

export default thePlanApp;
