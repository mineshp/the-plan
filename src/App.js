import React, { Component } from 'react';
import './App.css';
import MainNav from './components/MainNav';
import MainContainer from './components/MainContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainNav />
        <MainContainer />
      </div>
    );
  }
};

export default App;
