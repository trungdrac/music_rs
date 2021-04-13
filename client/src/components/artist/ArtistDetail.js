import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { setSongDetail } from "../../actions/songAction";
// import { setPlaylist } from "../../actions/playlistAction";
// import {
//   setCurrentIndex,
//   playAudio,
//   setLoadedSongs,
// } from "../../actions/playerAction";
// import callAPI from "../../helpers/callAPI";
import ListCard from "../home/ListCard";

class ArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  //   componentDidMount() {
  //     // get song
  //     const songId = this.props.match.params.id;
  //     callAPI("GET", `/song/${songId}`)
  //       .then((res) => {
  //         this.props.setSongDetail(res.data);
  //       })
  //       .then(() => this.setState({ isLoading: false }));
  //   }

  //   playAudio = () => {
  //     const playlist = { song: [this.props.songDetail] };
  //     this.props.setPlaylist(playlist);
  //     this.props.setCurrentIndex(0);
  //     this.props.setLoadedSongs([0]);
  //   };

  render() {
    if (this.state.isLoading === true) return "";
    return (
      <React.Fragment>
        <div className="row section text-center text-lg-left">
          <div className="col-xl-3 col-lg-4 col-sm-5">
          </div>
          <div className="col-xl-9 col-lg-8 col-sm-7">
            <div className="row pt-5">
              <div className="col-xl-8 col-lg-6"></div>
              <div className="col-xl-4 col-lg-6"></div>
            </div>
          </div>
        </div>
        <ListCard />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  //   songDetail: state.song.songDetail,
  //   currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // setSongDetail: (song) => dispatch(setSongDetail(song)),
    // setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
    // setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
    // playAudio: () => dispatch(playAudio()),
    // setLoadedSongs: (newLoadedSongs) =>
    //   dispatch(setLoadedSongs(newLoadedSongs)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
