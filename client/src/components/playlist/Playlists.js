import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import ListPlaylist from "./ListPlayList";

export class Playlists extends Component {
  render() {
    const { areas } = this.props;
    return (
      <React.Fragment>
        <Route path="/playlist/:areaId">
          {({ match, history }) => {
            const { areaId } = match ? match.params : {};

            return (
              <Tabs
                activeKey={areaId}
                onSelect={(nextTab) => history.replace(nextTab)}
              >
                {areas.map((area) => (
                  <Tab eventKey={area._id} title={area.name} key={area._id}>
                    <div className="mt-4 mb-4">
                      {areaId === area._id ? (
                        <ListPlaylist match={match} />
                      ) : (
                        ""
                      )}
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
