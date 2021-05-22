import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  setCurrentIndex,
  setListPlaying,
  toggleRandom,
} from "../../actions/playerAction";
import ListSongInline from "./ListSongInline";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };
  }

  handleSelect = (nextTab) => {
    switch (nextTab) {
      case "vpop":
        this.setState({ tab: 0 });
        break;
      case "usuk":
        this.setState({ tab: 1 });
        break;
      case "kpop":
        this.setState({ tab: 2 });
        break;
      default:
        break;
    }
  };

  playAll = () => {
    const { chart } = this.props;
    const { tab } = this.state;
    const listPlaying = chart[tab];
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
    if (this.props.isRandom) this.props.toggleRandom();
  };

  render() {
    const { chart } = this.props;

    return (
      <div className="section">
        <div className="heading">
          <div className="d-flex align-items-end justify-content-between">
            <h4 className="mb-0 p-2 rounded bg-light box-shadow">Bảng xếp hạng tuần</h4>
            <button
              className="btn btn-danger box-shadow"
              onClick={this.playAll}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span> PHÁT TẤT CẢ</span>
            </button>
          </div>
          <hr />
        </div>
        <Tabs
          defaultActiveKey="vpop"
          onSelect={(nextTab) => this.handleSelect(nextTab)}
        >
          <Tab eventKey="vpop" title="Việt Nam" key="vpop">
            <div className="mt-4 mb-4">
              <ListSongInline item={chart[0]} />
            </div>
          </Tab>
          <Tab eventKey="usuk" title="Âu Mỹ" key="usuk">
            <div className="mt-4 mb-4">
              <ListSongInline item={chart[1]} />
            </div>
          </Tab>
          <Tab eventKey="kpop" title="Hàn Quốc" key="kpop">
            <div className="mt-4 mb-4">
              <ListSongInline item={chart[2]} />
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isRandom: state.player.isRandom,
  chart: state.song.chart,
});

const mapDispatchToProps = (dispatch) => ({
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  toggleRandom: () => dispatch(toggleRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
