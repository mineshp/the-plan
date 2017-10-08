import { combineReducers } from 'redux';
import lists from './lists';
import projects from './projects';

const thePlanApp = combineReducers({
    projects, lists
});

export default thePlanApp;
