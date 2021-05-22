import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import MyPagination from "../general/MyPagination";
import SongCard from "../song/SongCard";
import { setResult } from "../../actions/searchAction";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class SearchSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
    };
  }

  componentDidMount() {
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getSearchSong() {
      return axios.get(
        `/search/song?q=${query.get("q")}&page=${query.get("page")}`
      );
    }

    function getCount() {
      return axios.get(`/search/count/song?q=${query.get("q")}`);
    }

    Promise.all([getSearchSong(), getCount()])
      .then((results) => {
        const searchSong = results[0].data;
        const count = results[1].data;
        this.props.setResult(searchSong);
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
    const { result } = this.props;
    if (result.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {result.map((item) => (
            <SongCard key={item._id} item={item} />
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
  result: state.search.result,
});

const mapDispatchToProps = (dispatch) => ({
  setResult: (result) => dispatch(setResult(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSong);
