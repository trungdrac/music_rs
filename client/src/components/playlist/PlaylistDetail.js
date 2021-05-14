import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlaylistDetail } from "../../actions/playlistAction";
import {
  setListPlaying,
  setCurrentIndex,
  toggleRandom,
} from "../../actions/playerAction";
import axios from "axios";
import toast from "../../helpers/toast";
import { DropdownButton } from "react-bootstrap";
import { faCaretSquareDown, faPlay } from "@fortawesome/free-solid-svg-icons";
import OptionsList from "../general/OptionsList";
import SongCard from "../song/SongCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PlaylistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const playlistId = this.props.match.params.id;
    axios
      .get(`/playlist/detail/${playlistId}`)
      .then((res) => this.props.setPlaylistDetail(res.data))
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response.data.message
              ? error.response.data.message
              : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
  }

  playPlaylist = () => {
    const listPlaying = this.props.playlistDetail.song;
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
    if (this.props.isRandom) this.props.toggleRandom();
  };

  render() {
    if (this.state.isLoading) return "";

    const { title, own, image, song, area } = this.props.playlistDetail;
    const { currentSongId } = this.props;

    return (
      <React.Fragment>
        <div className="row section text-center text-lg-left">
          <div className="col-xl-3 col-lg-4 col-sm-5">
            <img src={image} alt="" className="img-detail box-shadow" />
          </div>
          <div className="col-xl-9 col-lg-8 col-sm-7">
            <div className="row pt-5">
              <div className="col-lg-8">
                <h3>{title}</h3>
                <p>
                  <b>Tạo bởi: </b>
                  {own.username}
                </p>
                {area ? (
                  <p>
                    <b>Khu vực: </b>
                    {area.name}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center">
                <button
                  className="detail-btn btn btn-danger box-shadow"
                  disabled={currentSongId === song[0]._id}
                  onClick={this.playPlaylist}
                >
                  <FontAwesomeIcon icon={faPlay} />
                  <span> PHÁT</span>
                </button>

                <DropdownButton
                  className="box-shadow"
                  id="detail-dropdown-options"
                  drop="left"
                  title={
                    <React.Fragment>
                      <FontAwesomeIcon icon={faCaretSquareDown} />
                      <span> LỰA CHỌN</span>
                    </React.Fragment>
                  }
                >
                  <OptionsList song={this.props.songDetail} copyLink />
                </DropdownButton>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="heading">
            <div className="d-flex align-items-end justify-content-between">
              <h4 className="mb-0 p-2 rounded box-shadow">Danh sách bài hát</h4>
              <p className="p-2 rounded box-shadow">{song.length} bài hát</p>
            </div>
            <hr />
          </div>
          <div className="row">
            {song.map((song) => (
              <SongCard key={song._id} item={song} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  playlistDetail: state.playlist.playlistDetail,
  currentSongId: state.player.currentSongId,
  isPlaying: state.player.isPlaying,
  isRandom: state.player.isRandom,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaylistDetail: (playlist) => dispatch(setPlaylistDetail(playlist)),
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  toggleRandom: () => dispatch(toggleRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);
