import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setSongCategory } from "../../actions/songAction";
import SongCard from "./SongCard";
import MyPagination from "../general/MyPagination";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class ListSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
    };
  }

  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { categoryId } = this.props.match.params;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getSongCategory() {
      return axios.get(
        `/song/${areaId}/${categoryId}?page=${query.get("page")}`
      );
    }

    function getCount() {
      return axios.get(`/song/${areaId}/${categoryId}/count`);
    }

    Promise.all([getSongCategory(), getCount()])
      .then((results) => {
        const songCategory = results[0].data;
        const count = results[1].data;
        this.props.setSongCategory(songCategory);
        this.setState({
          pageNums: Math.ceil(count / NUMBER_OF_ITEM_PER_PAGE),
        });
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

  render() {
    if (this.state.isLoading || this.state.pageNums === null) return "";
    const { songCategory } = this.props;
    if (songCategory.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {songCategory.map((song) => (
            <SongCard key={song._id} item={song} />
          ))}
        </div>
        <MyPagination
          pageNums={this.state.pageNums}
          history={this.props.history}
        />
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
