import React from 'react';
import { MainNavConnectedComponent } from './HOC/Shared/MainNav';
import MainContainer from './components/MainContainer';
import NotificationContainer from './HOC/Shared/NotificationContainer';
import Footer from './components/Footer';

import './App.css';

const App = () => (
    <div className="App main-container">
        <NotificationContainer props />
        <MainNavConnectedComponent />
        <MainContainer />
        <Footer />
    </div>
);

export default App;
