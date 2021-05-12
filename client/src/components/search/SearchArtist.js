import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import MyPagination from "../general/MyPagination";
import { setResult } from "../../actions/searchAction";
import ArtistCard from "../artist/ArtistCard";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class SearchArtist extends Component {
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
    axios
      .get(`/search/artist?q=${query.get("q")}&page=${query.get("page")}`)
      .then((res) => this.props.setResult(res.data))
      .then(() => this.setState({ isLoading: false }))
      .catch(() =>
        toast({
          title: "Thất bại!",
          message: "Có lỗi xảy ra!",
          type: "error",
        })
      );

    axios
      .get(`/search/count/artist?q=${query.get("q")}`)
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
    const { result } = this.props;
    if (result.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {result.map((item) => (
            <ArtistCard key={item._id} item={item} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchArtist);
