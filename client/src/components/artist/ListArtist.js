import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setArtistArea } from "../../actions/artistAction";
import MyPagination from "../general/MyPagination";
import ArtistCard from "./ArtistCard";
import Blank from "../general/Blank";
import { NUMBER_OF_ITEM_PER_PAGE } from "../../constants/Config";
import toast from "../../helpers/toast";

class ListArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageNums: null,
    };
  }

  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    function getArtistArea() {
      return axios.get(`/artist/${areaId}?page=${query.get("page")}`);
    }

    function getCount() {
      return axios.get(`/artist/${areaId}/count`);
    }

    Promise.all([getArtistArea(), getCount()])
      .then((results) => {
        const artistArea = results[0].data;
        const count = results[1].data;
        this.props.setArtistArea(artistArea);
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
    const { artistArea } = this.props;
    if (artistArea.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {artistArea.map((artist) => (
            <ArtistCard key={artist._id} item={artist} />
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
  artistArea: state.artist.artistArea,
});

const mapDispatchToProps = (dispatch) => ({
  setArtistArea: (artists) => dispatch(setArtistArea(artists)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListArtist);
