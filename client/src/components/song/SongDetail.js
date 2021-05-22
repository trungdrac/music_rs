import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSongDetail } from "../../actions/songAction";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
} from "../../actions/playerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareDown,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "../../helpers/toast";
import { DropdownButton } from "react-bootstrap";
import OptionsList from "../general/OptionsList";
import Recommendation from "../user/Recommendation";

class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showMore: false,
    };
    this.collapseRef = React.createRef();
  }

  componentDidMount() {
    const songId = this.props.match.params.id;
    axios
      .get(`/song/detail/${songId}`)
      .then((res) => this.props.setSongDetail(res.data))
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        toast({
          title: "Thất bại!",
          message: `${
            error.response ? error.response.data.message : "Có lỗi xảy ra!"
          }`,
          type: "error",
        })
      );
  }

  playAudio = () => {
    const { currentSongId, songDetail } = this.props;
    if (currentSongId !== songDetail._id) {
      const playlist = [this.props.songDetail];
      this.props.setListPlaying(playlist);
      this.props.setCurrentIndex(0);
    } else {
      document.getElementById("player-audio").play();
    }
  };

  collapse = () => {
    this.setState({ showMore: !this.state.showMore });
    this.collapseRef.current.classList.toggle(
      "partially-hidden",
      this.state.showMore
    );
  };

  render() {
    if (this.state.isLoading) return "";

    const { _id, title, artist, image, lyrics, category } =
      this.props.songDetail;
    const { currentSongId, isPlaying, user } = this.props;
    const { showMore } = this.state;

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
                <h6 className="font-weight-normal">
                  {artist.map((artist, index) => (
                    <Link to={`/artist/detail/${artist._id}`} key={artist._id}>
                      {index > 0 && ", "}
                      {artist.name}
                    </Link>
                  ))}
                </h6>
                <p className="mt-4">
                  <b>Thể loại: </b>
                  {category.name}
                </p>
              </div>
              <div className="col-lg-4 d-flex flex-column align-items-center">
                {currentSongId !== _id || !isPlaying ? (
                  <button
                    className="detail-btn btn btn-danger box-shadow"
                    onClick={this.playAudio}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    <span> PHÁT</span>
                  </button>
                ) : (
                  <button
                    className="detail-btn btn btn-secondary box-shadow"
                    onClick={() =>
                      document.getElementById("player-audio").pause()
                    }
                  >
                    <FontAwesomeIcon icon={faPause} />
                    <span> TẠM DỪNG</span>
                  </button>
                )}
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
                  <OptionsList
                    song={this.props.songDetail}
                    like
                    addToPlaylist
                    playNext
                    playLast
                    copyLink
                    download
                  />
                </DropdownButton>
              </div>
            </div>
          </div>
        </div>
        {lyrics ? (
          <div className="lyrics box-shadow section">
            <div className="lyrics__header">Lời bài hát</div>
            <hr />
            <div
              className="lyrics__content partially-hidden"
              ref={this.collapseRef}
              dangerouslySetInnerHTML={{ __html: lyrics }}
            ></div>
            <span className="lyrics__collapse" onClick={this.collapse}>
              {showMore ? "Ẩn bớt" : "Xem thêm"}
            </span>
          </div>
        ) : (
          <div className="lyrics box-shadow section">
            <div className="lyrics__header">Chưa có lời cho bài hát này</div>
          </div>
        )}
        {user.userToken ? <Recommendation /> : ""}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isPlaying: state.player.isPlaying,
  songDetail: state.song.songDetail,
  currentSongId: state.player.currentSongId,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setSongDetail: (song) => dispatch(setSongDetail(song)),
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  playAudio: () => dispatch(playAudio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
