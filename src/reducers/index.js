/* istanbul ignore next not testing file */
import { combineReducers } from 'redux';
import lists from './lists';
import projects from './projects';
import notification from './notification';
import authentication from './authentication';
import controlCenter from './controlCenter';


/* istanbul ignore next: not testing combineReducers */
const thePlanApp = combineReducers({
    projects, lists, notification, authentication, controlCenter
});

/* istanbul ignore next: not testing export */
export default thePlanApp;
