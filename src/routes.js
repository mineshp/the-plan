import { Router, Route } from 'react-router-dom'
import App from './App';
import List from './components/App';

// routes.js
const routes = (
    <Route path="/" component={App}>
        <Route path="list" component={List} />
        <Route path="*" component={NoMatch} />
    </Route>
);

export default routes;