import React from 'react';
// import MainNav from './components/MainNav';
import { MainNavConnectedComponent } from './HOC/Shared/MainNav';
import MainContainer from './components/MainContainer';
import NotificationContainer from './HOC/Shared/NotificationContainer';
import Footer from './components/Footer';
import './App.css';

const App = () => (
    <div className="App">
        <NotificationContainer props />
        <MainNavConnectedComponent />
        <MainContainer />
        <Footer />
    </div>
);

export default App;
