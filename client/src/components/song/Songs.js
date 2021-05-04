import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import ListSong from "./ListSong";

export class Playlists extends Component {
  render() {
    const { areas } = this.props;
    return (
      <React.Fragment>
        <Route path="/song/:areaId/:categoryId">
          {({ match, history }) => {
            const { areaId } = match ? match.params : {};
            const { categoryId } = match ? match.params : {};

            return (
              <Tabs
                activeKey={areaId}
                onSelect={(nextTab) => {
                  let category = "";
                  switch (nextTab) {
                    case areas[0]._id:
                      category = areas[0].category[0]._id;
                      break;
                    case areas[1]._id:
                      category = areas[1].category[0]._id;
                      break;
                    case areas[2]._id:
                      category = areas[2].category[0]._id;
                      break;
                    case areas[3]._id:
                      category = areas[3].category[0]._id;
                      break;
                    default:
                      break;
                  }
                  return history.replace(`/song/${nextTab}/${category}`);
                }}
              >
                {areas.map((area) => (
                  <Tab eventKey={area._id} title={area.name} key={area._id}>
                    <div className="category-tab mt-3 mb-3">
                      <Tabs
                        activeKey={categoryId}
                        onSelect={(nextTab) => history.replace(nextTab)}
                      >
                        {area.category.map((category) => (
                          <Tab
                            eventKey={category._id}
                            title={category.name}
                            key={category._id}
                          >
                            <div className="mt-4 mb-4">
                              {categoryId === category._id ? (
                                <ListSong match={match} history={history} />
                              ) : (
                                ""
                              )}
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
