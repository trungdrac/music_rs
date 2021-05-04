import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faHome,
  faListUl,
  faMicrophone,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.arrowRef = React.createRef();
  }

  slideOff = () => {
    const arrow = this.arrowRef.current;
    //check arrow icon is visible
    if (arrow.offsetParent) arrow.click();
  };

  render() {
    const { areas } = this.props;
    const areaParam = areas.map((area) => area._id);
    return (
      <div className="sidebar translate-on-md">
        <div className="sidebar__header">
          <div>
            <Link to="/" onClick={this.slideOff}>
              <img src={"/images/logos/logo.svg"} alt="logo-app" />
            </Link>
          </div>
          <label
            htmlFor="sidebar-checkbox"
            className="sidebar__header--arrow d-xl-none"
            ref={this.arrowRef}
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </label>
        </div>
        <nav className="sidebar__nav">
          <ul className="list-group">
            <li className="sidebar__nav--header">Bài hát</li>
            <li onClick={this.slideOff}>
              <NavLink
                exact
                to="/"
                className="sidebar__nav--link"
                activeClassName="active"
              >
                <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className="sidebar__nav--header">Khám phá</li>
            <li onClick={this.slideOff}>
              <Route path="/:slug/:area">
                {({ match }) => {
                  const { slug } = match ? match.params : {};
                  const { area } = match ? match.params : {};
                  return (
                    <NavLink
                      to={`/song/${areas[0]._id}/${areas[0].category[0]._id}`}
                      isActive={() =>
                        slug === "song" && areaParam.includes(area)
                      }
                      className="sidebar__nav--link"
                      activeClassName="active"
                    >
                      <FontAwesomeIcon
                        icon={faMusic}
                        className="sidebar-icon"
                      />
                      <span>Bài hát</span>
                    </NavLink>
                  );
                }}
              </Route>
            </li>
            <li onClick={this.slideOff}>
              <Route path="/:slug/:area">
                {({ match }) => {
                  const { slug } = match ? match.params : {};
                  const { area } = match ? match.params : {};
                  return (
                    <NavLink
                      to={`/playlist/${areas[0]._id}`}
                      isActive={() =>
                        slug === "playlist" && areaParam.includes(area)
                      }
                      className="sidebar__nav--link"
                      activeClassName="active"
                    >
                      <FontAwesomeIcon
                        icon={faListUl}
                        className="sidebar-icon"
                      />
                      <span>Playlist</span>
                    </NavLink>
                  );
                }}
              </Route>
            </li>
            <li onClick={this.slideOff}>
              <Route path="/:slug/:area">
                {({ match }) => {
                  const { slug } = match ? match.params : {};
                  const { area } = match ? match.params : {};
                  return (
                    <NavLink
                      to={`/artist/${areas[0]._id}`}
                      isActive={() =>
                        slug === "artist" && areaParam.includes(area)
                      }
                      className="sidebar__nav--link"
                      activeClassName="active"
                    >
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        className="sidebar-icon"
                      />
                      <span>Nghệ sỹ</span>
                    </NavLink>
                  );
                }}
              </Route>
            </li>
          </ul>
        </nav>
        <div className="sidebar__footer">
          <Link to="/" className="btn btn-block btn-danger">
            <span>Thêm nhạc</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  areas: state.area,
});

export default connect(mapStateToProps)(Sidebar);
