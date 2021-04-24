import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import axios from "axios";
import Validator from "../../helpers/validator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
    };
  }
  componentDidMount() {
    Validator({
      form: "#login-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#username"),
        Validator.isRequired("#password"),
        Validator.minLength("#password", 6),
      ],
      onSubmit: (data) => {
        axios
          .post("/user/login", data)
          .then((res) => {
            const user = res.data;
            this.props.setCurrentUser(user);
            this.props.history.push("/");
          })
          .catch((error) => {
            const errorData = error.response.data;
            this.setState({ errorMessage: errorData.message });
          });
      },
    });
  }

  render() {
    return (
      <div className="auth">
        <form
          action="true"
          method="POST"
          className="form box-shadow"
          id="login-form"
        >
          <div className="d-flex align-items-center justify-content-around">
            <h3 className="heading">Đăng nhập</h3>
            <Link to="/">
              <img src={"/images/logos/logo.svg"} alt="logo-app" />
            </Link>
          </div>
          <div className="spacer" />
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="form-control"
              onChange={() => this.setState({ errorMessage: "" })}
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
              onChange={() => this.setState({ errorMessage: "" })}
            />
            <span className="form-message" />
          </div>
          <span className="form-message">{this.state.errorMessage}</span>
          <button className="form-submit">Đăng nhập</button>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/login" className="auth__options">
              Quên mật khẩu?
            </Link>
            <Link to="/register" className="auth__options">
              Đăng ký ngay!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
