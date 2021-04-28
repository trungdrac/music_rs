import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setArtistArea } from "../../actions/artistAction";
import MyPagination from "../general/MyPagination";
import ArtistCard from "./ArtistCard";

class ListArtist extends Component {
  componentDidMount() {
    const { areaId } = this.props.match.params;

    axios
      .get(`/artist/${areaId}`)
      .then((res) => this.props.setArtistArea(res.data))
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
      <React.Fragment>
        <div className="row">
          {this.props.artistArea.map((artist) => (
            <ArtistCard key={artist._id} item={artist} />
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
  artistArea: state.artist.artistArea,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setArtistArea: (artists) => dispatch(setArtistArea(artists)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListArtist);
