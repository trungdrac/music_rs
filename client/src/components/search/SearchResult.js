import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { Route } from "react-router-dom";
import SearchSong from "./SearchSong";
import SearchPlaylist from "./SearchPlaylist";
import SearchArtist from "./SearchArtist";

export class SearchTabs extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path="/search/:type">
          {({ match, history }) => {
            const { type } = match ? match.params : {};
            const { search } = this.props.history.location;
            const query = new URLSearchParams(search);

            return (
              <Tabs
                activeKey={type}
                onSelect={(nextTab) =>
                  history.replace(`${nextTab}?q=${query.get("q")}`)
                }
              >
                <Tab eventKey="song" title="Bài hát">
                  <div className="mt-4 mb-4">
                    {type === "song" ? <SearchSong history={history} /> : ""}
                  </div>
                </Tab>
                <Tab eventKey="playlist" title="Playlist">
                  <div className="mt-4 mb-4">
                    {type === "playlist" ? (
                      <SearchPlaylist history={history} />
                    ) : (
                      ""
                    )}
                  </div>
                </Tab>
                <Tab eventKey="artist" title="Nghệ sĩ">
                  <div className="mt-4 mb-4">
                    {type === "artist" ? (
                      <SearchArtist history={history} />
                    ) : (
                      ""
                    )}
                  </div>
                </Tab>
              </Tabs>
            );
          }}
        </Route>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(SearchTabs);
