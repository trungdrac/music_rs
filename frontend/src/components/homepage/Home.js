import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import ListCard from "./ListCard";
import Player from "../general/Player";

class Home extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="container-fruit">
            <ListCard />
            <ListCard />
            <ListCard />
          </div>
          <Player />
        </div>
      </div>
    );
  }
}

export default Home;
