import React, { Component } from "react";
import Content from "./components/layout/Content";
import Sidebar from "./components/layout/Sidebar";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default App;
