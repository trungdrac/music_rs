import React, { Component } from "react";
import { connect } from "react-redux";
import { setArtistDetail } from "../../actions/artistAction";
import axios from "axios";
import {
  setListPlaying,
  setCurrentIndex,
  toggleRandom,
} from "../../actions/playerAction";
import toast from "../../helpers/toast";
import SongCard from "../song/SongCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

class ArtistDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const artistId = this.props.match.params.id;
    axios
      .get(`/artist/detail/${artistId}`)
      .then((res) => {
        const artistDetail = { ...res.data[0], song: res.data[1] };
        this.props.setArtistDetail(artistDetail);
      })
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

  play = () => {
    const listPlaying = this.props.artistDetail.song;
    this.props.setListPlaying(listPlaying);
    this.props.setCurrentIndex(0);
    if (this.props.isRandom) this.props.toggleRandom();
  };

  render() {
    if (this.state.isLoading) return "";
    const { name, image, area, song } = this.props.artistDetail;

    return (
      <React.Fragment>
        <div className="row section text-center text-lg-left">
          <div className="col-sm-6 text-center">
            <img src={image} alt="" className="img-artist-detail box-shadow" />
          </div>
          <div className="col-sm-6 text-center">
            <h3 className="mt-5">{name}</h3>
            <p className="mt-3">
              <b>Khu vực: </b>
              {area.name}
            </p>
            <button
              className="detail-btn btn btn-danger mt-5 box-shadow"
              onClick={this.play}
            >
              <FontAwesomeIcon icon={faPlay} />
              <span> PHÁT</span>
            </button>
          </div>
        </div>
        <div className="section">
          <div className="heading">
            <div className="d-flex align-items-end justify-content-between">
              <h4 className="mb-0 p-2 rounded bg-light box-shadow">
                Danh sách bài hát
              </h4>
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
  artistDetail: state.artist.artistDetail,
});

const mapDispatchToProps = (dispatch) => ({
  setArtistDetail: (artist) => dispatch(setArtistDetail(artist)),
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  toggleRandom: () => dispatch(toggleRandom()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);
