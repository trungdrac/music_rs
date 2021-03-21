import React, { Component } from 'react';
import Content from './components/layout/Content';
import SideBar from './components/layout/SideBar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <SideBar />
        <Content />
      </div>
    );
  }
}

export default App;
