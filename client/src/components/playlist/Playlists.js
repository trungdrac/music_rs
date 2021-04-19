import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import slug from "../../helpers/slug";

export class Playlists extends Component {
  componentDidMount() {
    //set slug default to url
    if (this.props.history.location.pathname === "/playlist/") {
      this.handleSelect("viet-nam");
    }
  }

  handleSelect = (route) => this.props.history.push(route);
  getTab = () => {
    const { pathname } = this.props.history.location;
    if (pathname === "/playlist/") return "viet-nam";
    return pathname.slice(10);
  };

  render() {
    const { areas } = this.props;

    return (
      <React.Fragment>
        <Tabs
          defaultActiveKey={this.getTab}
          transition={false}
          onSelect={(route) => this.handleSelect(route)}
        >
          {areas.map((area) => (
            <Tab eventKey={slug(area.name)} title={area.name} key={area._id}>
              <div className="mt-4 mb-4"></div>
            </Tab>
          ))}
        </Tabs>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  areas: state.area,
});

export default connect(mapStateToProps)(Playlists);
