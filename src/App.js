import React from 'react';
import MainNav from './components/MainNav';
import MainContainer from './components/MainContainer';
import NotificationContainer from './HOC/Shared/NotificationContainer';
import './App.css';

const App = () => (
    <div className="App">
        <NotificationContainer props />
        <MainNav />
        <MainContainer />
    </div>
);

export default App;
