import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import MyPagination from "../general/MyPagination";
import SongCard from "../song/SongCard";
import { setResult } from "../../actions/searchAction";

class SearchSong extends Component {
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
      .get(`/search/song?q=${query.get("q")}&page=${query.get("page")}`)
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

    return (
      <React.Fragment>
        <div className="row">
          {this.props.result.map((item) => (
            <SongCard key={item._id} item={item} />
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
  result: state.search.result,
});

const mapDispatchToProps = (dispatch) => ({
  setResult: (result) => dispatch(setResult(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSong);
