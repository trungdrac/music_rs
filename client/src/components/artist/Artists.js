import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import ListArtist from "./ListArtist";

class Artists extends Component {
  render() {
    const { areas } = this.props;
    return (
      <React.Fragment>
        <Route path="/artist/:areaId">
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
                        <ListArtist match={match} history={history} />
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

export default connect(mapStateToProps)(Artists);
