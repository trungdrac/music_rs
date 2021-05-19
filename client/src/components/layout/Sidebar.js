import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link, NavLink, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faHeart,
  faHistory,
  faHome,
  faClipboardList,
  faMicrophone,
  faMusic,
  faListAlt,
  faHandPointRight,
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
    const { areas, userToken, location } = this.props;
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
            <li className="sidebar__nav--header">Music RS</li>
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
                        icon={faClipboardList}
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
            {userToken ? (
              <React.Fragment>
                <li className="sidebar__nav--header">Cá nhân</li>
                <li onClick={this.slideOff}>
                  <NavLink
                    exact
                    to={`/user/recommend`}
                    className="sidebar__nav--link"
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      icon={faHandPointRight}
                      className="sidebar-icon"
                    />
                    <span>Gợi ý cho bạn</span>
                  </NavLink>
                </li>
                <li onClick={this.slideOff}>
                  <NavLink
                    exact
                    to={`/user/liked-song`}
                    className="sidebar__nav--link"
                    activeClassName="active"
                  >
                    <FontAwesomeIcon icon={faHeart} className="sidebar-icon" />
                    <span>Bài hát yêu thích</span>
                  </NavLink>
                </li>
                <li onClick={this.slideOff}>
                  <NavLink
                    exact
                    to="/user/my-playlist"
                    className="sidebar__nav--link"
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      icon={faListAlt}
                      className="sidebar-icon"
                    />
                    <span>Playlist của tôi</span>
                  </NavLink>
                </li>
                <li onClick={this.slideOff}>
                  <NavLink
                    exact
                    to="/user/history"
                    className="sidebar__nav--link"
                    activeClassName="active"
                  >
                    <FontAwesomeIcon
                      icon={faHistory}
                      className="sidebar-icon"
                    />
                    <span>Lịch sử</span>
                  </NavLink>
                </li>
              </React.Fragment>
            ) : (
              <div className="sidebar__footer box-shadow">
                <p className="text-center mb-2">
                  Đăng nhập để có trải nghiệm tốt hơn tại MusicRS!
                </p>
                <Link
                  to={{
                    pathname: "/login",
                    state: { prevPath: location.pathname },
                  }}
                  className="btn btn-block btn-danger"
                >
                  <span>Đăng nhập</span>
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  areas: state.area,
  userToken: state.user.userToken,
});

const SidebarWithRouter = withRouter(Sidebar);
export default connect(mapStateToProps)(SidebarWithRouter);
