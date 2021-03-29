import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Section from "./Section";
import Player from "../layout/Player";

class Home extends Component {
  render() {
    return (
      <div className="cover">
        <Sidebar />
        <div className="content">
          <Header />
          <Section />
          <Player />
        </div>
      </div>
    );
  }
}

export default Home;
