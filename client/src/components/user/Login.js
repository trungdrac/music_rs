import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import axios from "axios";
import Validator from "../../helpers/validator";
import toast from "../../helpers/toast";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameMessage: "",
      passwordMessage: "",
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
        Validator.minLength("#username", 4),
        Validator.minLength("#password", 6),
      ],
      onSubmit: (data) => {
        axios
          .post("/user/login", data)
          .then((res) => {
            const user = res.data;
            this.props.setCurrentUser(user);
            this.props.history.replace("/");
            toast({
              title: "Thành công!",
              message: "Bạn đã đăng nhập thành công!",
              type: "success",
            });
          })
          .catch((error) => {
            const errorData = error.response.data;
            if (errorData.field === "username")
              this.setState({ usernameMessage: errorData.message });
            if (errorData.field === "password")
              this.setState({ passwordMessage: errorData.message });
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
          <div
            className={`form-group ${
              this.state.usernameMessage ? "api-invalid" : ""
            }`}
          >
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="form-control"
              onChange={() => this.setState({ usernameMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.usernameMessage}</span>
          </div>
          <div
            className={`form-group ${
              this.state.passwordMessage ? "api-invalid" : ""
            }`}
          >
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              className="form-control"
              onChange={() => this.setState({ passwordMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.passwordMessage}</span>
          </div>
          <button className="form-submit">Đăng nhập</button>
          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password" className="auth__options text-info">
              Quên mật khẩu?
            </Link>
            <Link to="/register" className="auth__options text-info">
              Đăng ký ngay!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
