import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import slug from "../../helpers/slug";

export class Playlists extends Component {
  componentDidMount() {
    //set slug default to url
    this.handleSelect("viet-nam");
  }

  handleSelect = (route) => this.props.history.push(route);

  render() {
    const { areas } = this.props;

    return (
      <React.Fragment>
        <Tabs transition={false}>
          {areas.map((area) => (
            <Tab eventKey={slug(area.name)} title={area.name} key={area._id}>
              <div className="mt-3 mb-3">
                <Tabs
                  transition={false}
                  onSelect={(route) => this.handleSelect(route)}
                >
                  {area.category.map((category) => (
                    <Tab
                      eventKey={slug(category.name)}
                      title={category.name}
                      key={category._id}
                    >
                      <div className="mt-4 mb-4"></div>
                    </Tab>
                  ))}
                </Tabs>
              </div>
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
