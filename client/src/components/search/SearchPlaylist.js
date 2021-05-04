import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import MyPagination from "../general/MyPagination";
import PlaylistCard from "../playlist/PlaylistCard";
import { setResult } from "../../actions/searchAction";
import Blank from "../general/Blank";

class SearchPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);
    axios
      .get(`/search/playlist?q=${query.get("q")}&page=${query.get("page")}`)
      .then((res) => this.props.setResult(res.data))
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
    const { result } = this.props;
    if (result.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {result.map((item) => (
            <PlaylistCard key={item._id} item={item} />
          ))}
        </div>
        <MyPagination />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaylist);
