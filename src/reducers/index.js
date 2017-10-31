/* istanbul ignore next not testing file */
import { combineReducers } from 'redux';
import lists from './lists';
import projects from './projects';
import notification from './notification';

/* istanbul ignore next: not testing combineReducers */
const thePlanApp = combineReducers({
    projects, lists, notification
});

/* istanbul ignore next: not testing export */
export default thePlanApp;
