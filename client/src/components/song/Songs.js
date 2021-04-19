import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import slug from "../../helpers/slug";

export class Playlists extends Component {
  componentDidMount() {
    //set slug default to url
    // this.handleSelect("nhac-tre");
  }

  handleSelect = (route) => {
    switch (route) {
      case "viet-nam":
        route = "nhac-tre";
        break;
      case "au-my":
        route = "pop";
        break;
      case "chau-a":
        route = "nhac-han";
        break;
      case "khac":
        route = "thieu-nhi";
        break;
      default:
        break;
    }
    this.props.history.push(route);
  };

  getTab = () => {
    const {pathname} = this.props.history.location
    return pathname.slice(5)
  }

  render() {
    const { areas } = this.props;

    return (
      <React.Fragment>
        <Tabs transition={false} onSelect={this.handleSelect}>
          {areas.map((area) => (
            <Tab eventKey={slug(area.name)} title={area.name} key={area._id}>
              <div className="category-tab mt-3 mb-3">
                <Tabs defaultActiveKey={this.getTab} transition={false} onSelect={this.handleSelect}>
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
