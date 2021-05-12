import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSongDetail } from "../../actions/songAction";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
} from "../../actions/playerAction";
import Section from "../general/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "../../helpers/toast";

class SongDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const songId = this.props.match.params.id;
    axios
      .get(`/song/detail/${songId}`)
      .then((res) => {
        this.props.setSongDetail(res.data);
      })
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

  playAudio = () => {
    const playlist = [this.props.songDetail];
    this.props.setListPlaying(playlist);
    this.props.setCurrentIndex(0);
  };

  render() {
    if (this.state.isLoading) return "";

    const { _id, title, artist, image, lyrics, category } =
      this.props.songDetail;
    const { currentSongId } = this.props;

    return (
      <React.Fragment>
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
                  <button
                    className="btn btn-danger box-shadow mt-4"
                    onClick={this.playAudio}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                    <span> PHÁT</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary box-shadow mt-4"
                    disabled
                  >
                    <span>ĐANG PHÁT</span>
                  </button>
                )}
              </div>
              <div className="col-xl-4 col-lg-6">
                <table className="table table-borderless">
                  <tbody>
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
        <Section />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  songDetail: state.song.songDetail,
  currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => ({
  setSongDetail: (song) => dispatch(setSongDetail(song)),
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  playAudio: () => dispatch(playAudio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongDetail);
