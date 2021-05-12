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

    axios
      .get(`/song/${areaId}/${categoryId}?page=${query.get("page")}`)
      .then((res) => this.props.setSongCategory(res.data))
      .then(() => this.setState({ isLoading: false }))
      .catch(() =>
        toast({
          title: "Thất bại!",
          message: "Có lỗi xảy ra!",
          type: "error",
        })
      );

    axios
      .get(`/song/${areaId}/${categoryId}/count`)
      .then((res) =>
        this.setState({
          pageNums: Math.ceil(res.data / NUMBER_OF_ITEM_PER_PAGE),
        })
      )
      .catch(() =>
        toast({
          title: "Thất bại!",
          message: "Có lỗi xảy ra!",
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
