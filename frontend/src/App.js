import React, { Component } from "react";
import Content from "./components/layout/Content";
import RightSIdebar from "./components/layout/RightSIdebar";
import Sidebar from "./components/layout/Sidebar";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <Content />
        <RightSIdebar />
      </div>
    );
  }
}

export default App;
