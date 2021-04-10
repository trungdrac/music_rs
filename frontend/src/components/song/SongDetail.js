import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSongDetail } from "../../actions/songAction";
import { setPlaylist } from "../../actions/playlistAction";
import {
  setCurrentIndex,
  playAudio,
  setLoadedSongs,
} from "../../actions/playerAction";
import callAPI from "../../helpers/callAPI";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Player from "../general/Player";
import ListCard from "../homepage/ListCard";

class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    // get song
    const songId = this.props.match.params.id;
    callAPI("GET", `/song/${songId}`)
      .then((res) => {
        this.props.setSongDetail(res.data);
      })
      .then(() => this.setState({ isLoading: false }));
  }

  playAudio = () => {
    const playlist = { song: [this.props.songDetail] };
    this.props.setPlaylist(playlist);
    this.props.setCurrentIndex(0);
    this.props.setLoadedSongs([0]);
  };

  render() {
    const {
      _id,
      title,
      artist,
      image,
      lyrics,
      category,
      area,
    } = this.props.songDetail;
    console.log(_id)
    const { currentSongId } = this.props.currentSongId;

    if (this.state.isLoading === true) return "";
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Header />
          <div className="main-content container-fruit">
            <div className="row section text-center text-lg-left">
              <div className="col-xl-3 col-lg-4 col-sm-5">
                <img src={image} alt="" className="img-detail box-shadow" />
              </div>
              <div className="col-xl-9 col-lg-8 col-sm-7">
                <div className="row pt-5">
                  <div className="col-xl-8 col-lg-6">
                    <h5>{title}</h5>
                    <h6 className="card-artist">
                      {artist.map((artist, index) => (
                        <Link to="/" key={artist._id}>
                          {index > 0 && ", "}
                          {artist.name}
                        </Link>
                      ))}
                    </h6>
                    {currentSongId !== _id ? (
                      <div
                        className="btn btn-danger box-shadow mt-4"
                        onClick={this.playAudio}
                      >
                        <span>PHÁT NHẠC</span>
                      </div>
                    ) : (
                      <div
                        className="btn btn-primary box-shadow mt-4"
                      >
                        <span>ĐANG PHÁT</span>
                      </div>
                    )}
                  </div>
                  <div className="col-xl-4 col-lg-6">
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th>Khu vực</th>
                          <td>{area.name}</td>
                        </tr>
                        <tr>
                          <th>Thể loại</th>
                          <td>{category.name}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {lyrics ? (
              <div className="lyrics box-shadow section">
                <div className="lyrics__header">Lời bài hát</div>
                <hr />
                <div
                  className="lyrics__content mt-2 mb-2"
                  dangerouslySetInnerHTML={{ __html: lyrics }}
                ></div>
              </div>
            ) : (
              ""
            )}
            <ListCard />
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songDetail: state.song.songDetail,
  currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSongDetail: (song) => dispatch(setSongDetail(song)),
    setPlaylist: (playlist) => dispatch(setPlaylist(playlist)),
    setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
    playAudio: () => dispatch(playAudio()),
    setLoadedSongs: (newLoadedSongs) =>
      dispatch(setLoadedSongs(newLoadedSongs)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
