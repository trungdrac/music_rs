import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../song/Chart";
import Recommendation from "../user/Recommendation";

class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <Chart />
        {user.userToken ? <Recommendation /> : ""}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Home);
