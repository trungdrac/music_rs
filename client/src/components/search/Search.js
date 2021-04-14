import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";

export class SearchTabs extends Component {
  render() {
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="all" transition={false}>
          <Tab eventKey="all" title="Tất cả">
            <div>aaa</div>
          </Tab>
          <Tab eventKey="song" title="Bài hát">
            <div>bbb</div>
          </Tab>
          <Tab eventKey="playlist" title="Playlist">
            <div>ccc</div>
          </Tab>
          <Tab eventKey="artist" title="Nghệ sỹ">
            <div>ddd</div>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTabs);
