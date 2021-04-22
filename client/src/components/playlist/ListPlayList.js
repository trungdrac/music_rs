import React, { Component } from "react";
import { connect } from "react-redux";
import callAPI from "../../helpers/callAPI";
import { setSongCategory } from "../../actions/songAction";
import SongCard from "../general/SongCard";

class ListPlaylist extends Component {
  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { categoryId } = this.props.match.params;

    callAPI("GET", `/song/${areaId}/${categoryId}`).then((res) =>
      this.props.setSongCategory(res.data)
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
