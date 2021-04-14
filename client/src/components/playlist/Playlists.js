import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";

export class Playlists extends Component {
  handleSelect = (route) => this.props.history.push(route)

  render() {
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="/vietnam" transition={false} onSelect={(route) => this.handleSelect(route)}>
          <Tab eventKey="vietnam" title="Việt Nam">
            <div>aaa</div>
          </Tab>
          <Tab eventKey="usuk" title="Âu Mỹ">
            <div>bbb</div>
          </Tab>
          <Tab eventKey="asian" title="Châu Á">
            <div>ccc</div>
          </Tab>
          <Tab eventKey="other" title="Khác">
            <div>ddd</div>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
