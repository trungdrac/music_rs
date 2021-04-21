import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import slug from "../../helpers/slug";

export class Playlists extends Component {
  render() {
    const { areas } = this.props;
    return (
      <React.Fragment>
        <Route path="/artist/:areaTab">
          {({ match, history }) => {
            const { areaTab } = match ? match.params : {};

            return (
              <Tabs
                activeKey={areaTab}
                transition={false}
                onSelect={(nextTab) => history.replace(nextTab)}
              >
                {areas.map((area) => (
                  <Tab
                    eventKey={slug(area.name)}
                    title={area.name}
                    key={area._id}
                  >
                    <div className="mt-4 mb-4"></div>
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
