import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setSongCategory } from "../../actions/songAction";
import SongCard from "../general/SongCard";

class ListPlaylist extends Component {
  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { categoryId } = this.props.match.params;

    axios
      .get(`/song/${areaId}/${categoryId}`)
      .then((res) => this.props.setSongCategory(res.data))
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  }

  render() {
    return (
      <div className="row">
        {this.props.songCategory.map((song) => (
          <SongCard key={song._id} item={song} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songCategory: state.song.songCategory,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setSongCategory: (songs) => dispatch(setSongCategory(songs)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListPlaylist);
