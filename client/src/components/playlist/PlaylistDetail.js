import React, { Component } from "react";
import { connect } from "react-redux";
import { setPlaylistDetail } from "../../actions/playlistAction";
import {
  setListPlaying,
  setCurrentIndex,
  playAudio,
} from "../../actions/playerAction";
import Section from "../general/Section";
import axios from "axios";
import toast from "../../helpers/toast";

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

  render() {
    if (this.state.isLoading) return "";

    const { title, own, image, song } = this.props.playlistDetail;

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
                <p>Tạo bởi: {own.username}</p>
                <div className="mt-4">
                  <a
                    href="/"
                    className="btn btn-pill btn-air btn-bold btn-danger"
                  >
                    Play
                  </a>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Thể loại</th>
                      <td>Âu Mỹ</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>Pop</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="header-table-song">Danh sách bài hát</div>
        <div className="table-song box-shadow section">
          <table className="table table-borderless table-striped">
            <thead>
              <tr className="table-secondary">
                <th scope="col">TIÊU ĐỀ</th>
                <th scope="col">NGHỆ SỸ</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              <tr className="spacer" />
            </thead>
            <tbody>
              <tr className="table-song__row">
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr className="spacer" />
              <tr className="table-song__row">
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr className="spacer"></tr>
              <tr className="table-song__row">
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
              <tr className="spacer" />
            </tbody>
          </table>
        </div>
        <Section />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  playlistDetail: state.playlist.playlistDetail,
  currentSongId: state.player.currentSongId,
});

const mapDispatchToProps = (dispatch) => ({
  setPlaylistDetail: (playlist) => dispatch(setPlaylistDetail(playlist)),
  setListPlaying: (playlist) => dispatch(setListPlaying(playlist)),
  setCurrentIndex: (newIndex) => dispatch(setCurrentIndex(newIndex)),
  playAudio: () => dispatch(playAudio()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);
