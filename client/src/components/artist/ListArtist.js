import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setArtistArea } from "../../actions/artistAction";
import MyPagination from "../general/MyPagination";
import ArtistCard from "./ArtistCard";
import Blank from "../general/Blank";

class ListArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { areaId } = this.props.match.params;
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);

    axios
      .get(`/artist/${areaId}?page=${query.get("page")}`)
      .then((res) => this.props.setArtistArea(res.data))
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
    const { artistArea } = this.props;
    if (artistArea.length === 0) return <Blank />;

    return (
      <React.Fragment>
        <div className="row">
          {artistArea.map((artist) => (
            <ArtistCard key={artist._id} item={artist} />
          ))}
        </div>
        <MyPagination />
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
