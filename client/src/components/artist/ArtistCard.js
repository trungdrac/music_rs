import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ArtistCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mt-3">
        <div className="card border-0 h-100">
          <div className="card-img box-shadow rounded-circle">
            <Link to={`/artist/detail/${item._id}`}>
              <img
                src={item.image}
                className="card-img-custom card-img-top rounded-circle"
                alt="..."
              />
            </Link>
          </div>
          <div className="card-body pl-0 pr-0">
            <h6 className="card-title text-center">
              <Link to={`/artist/detail/${item._id}`}>{item.name}</Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCard);
