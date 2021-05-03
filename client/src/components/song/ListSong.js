import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setSongCategory } from "../../actions/songAction";
import SongCard from "./SongCard";
import MyPagination from "../general/MyPagination";

class ListSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { categoryId } = this.props.match.params;

    axios
      .get(`/song/${areaId}/${categoryId}`)
      .then((res) => this.props.setSongCategory(res.data))
      .then(() => this.setState({ isLoading: false }))
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }

  render() {
    if (this.state.isLoading) return "";

    return (
      <React.Fragment>
        <div className="row">
          {this.props.songCategory.map((song) => (
            <SongCard key={song._id} item={song} />
          ))}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <MyPagination />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  songCategory: state.song.songCategory,
});

const mapDispatchToProps = (dispatch) => ({
  setSongCategory: (songs) => dispatch(setSongCategory(songs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSong);
