import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Section from "./Section";
import Player from "../general/Player";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Header />
          <Section />
          <Section />
          <Section />
          <Player />
        </div>
      </div>
    );
  }
}

export default Home;
