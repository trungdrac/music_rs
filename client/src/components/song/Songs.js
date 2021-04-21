import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import slug from "../../helpers/slug";
import Section from "../general/Section";

export class Playlists extends Component {
  render() {
    const { areas } = this.props;
    return (
      <React.Fragment>
        <Route path="/song/:areaTab/:categoryTab">
          {({ match, history }) => {
            const { areaTab } = match ? match.params : {};
            const { categoryTab } = match ? match.params : {};

            return (
              <Tabs
                activeKey={areaTab}
                transition={false}
                onSelect={(nextTab) => {
                  let category = "";
                  switch (nextTab) {
                    case "viet-nam":
                      category = "nhac-tre";
                      break;
                    case "au-my":
                      category = "pop";
                      break;
                    case "chau-a":
                      category = "nhac-han";
                      break;
                    case "khac":
                      category = "thieu-nhi";
                      break;
                    default:
                      break;
                  }
                  return history.replace(`/song/${nextTab}/${category}`);
                }}
              >
                {areas.map((area) => (
                  <Tab
                    eventKey={slug(area.name)}
                    title={area.name}
                    key={area._id}
                  >
                    <div className="category-tab mt-3 mb-3">
                      <Tabs
                        activeKey={categoryTab}
                        transition={false}
                        onSelect={(nextTab) => history.replace(nextTab)}
                      >
                        {area.category.map((category) => (
                          <Tab
                            eventKey={slug(category.name)}
                            title={category.name}
                            key={category._id}
                          >
                            <div className="mt-4 mb-4">
                              <Section />
                            </div>
                          </Tab>
                        ))}
                      </Tabs>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            );
          }}
        </Route>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  areas: state.area,
});

export default connect(mapStateToProps)(Playlists);
