import React, { Component } from "react";
import ListCard from "./ListCard";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <ListCard />
        <ListCard />
        <ListCard />
      </React.Fragment>
    );
  }
}

export default Home;
