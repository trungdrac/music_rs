import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../actions/userAction";
import axios from "axios";
import Validator from "../../helpers/validator";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameMessage: "",
      emailMessage: "",
    };
  }
  componentDidMount() {
    Validator({
      form: "#register-form",
      formGroupSelector: ".form-group",
      errorSelector: ".form-message",
      rules: [
        Validator.isRequired("#username"),
        Validator.isRequired("#email"),
        Validator.isRequired("#password"),
        Validator.isRequired("#password_confirmation"),
        Validator.minLength("#username", 4),
        Validator.isEmail("#email"),
        Validator.minLength("#password", 6),
        Validator.isConfirmed(
          "#password_confirmation",
          () => document.querySelector("#register-form #password").value,
          "Mật khẩu nhập lại không chính xác"
        ),
      ],
      onSubmit: (data) => {
        delete data.password_confirmation;
        if (!this.state.usernameMessage && !this.state.emailMessage) {
          axios
            .post("/user/register", data)
            .then((res) => {
              const user = res.data;
              this.props.setCurrentUser(user);
              this.props.history.replace("/");
            })
            .catch((error) =>
              alert(
                `Lỗi! ${
                  error.response.data.message ? error.response.data.message : ""
                }`
              )
            );
        }
      },
    });
  }

  checkExisted = (e) => {
    let data = {};
    data[e.target.name] = e.target.value;
    axios
      .post("/user/register/existed", data)
      .then((res) => {
        const result = res.data;
        if (result.field === "username")
          this.setState({ usernameMessage: result.message });
        if (result.field === "email")
          this.setState({ emailMessage: result.message });
      })
      .catch((error) =>
        alert(
          `Lỗi! ${
            error.response.data.message ? error.response.data.message : ""
          }`
        )
      );
  };

  render() {
    return (
      <div className="auth">
        <form
          action="true"
          method="POST"
          className="form box-shadow"
          id="register-form"
        >
          <div className="d-flex align-items-center justify-content-around">
            <h3 className="heading">Đăng ký</h3>
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
              onBlur={this.checkExisted}
              onInput={() => this.setState({ usernameMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.usernameMessage}</span>
          </div>
          <div
            className={`form-group ${
              this.state.emailMessage ? "api-invalid" : ""
            }`}
          >
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="VD: email@domain.com"
              className="form-control"
              onBlur={this.checkExisted}
              onInput={() => this.setState({ emailMessage: "" })}
            />
            <span className="form-message" />
            <span className="api-message">{this.state.emailMessage}</span>
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
            />
            <span className="form-message" />
          </div>
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
              Nhập lại mật khẩu
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="form-control"
            />
            <span className="form-message" />
          </div>
          <button className="form-submit">Đăng ký</button>
          <div className="d-flex justify-content-center mt-3">
            <span className="auth__options">Đã có tài khoản?</span>
            <Link to="/login" className="auth__options ml-2 text-info">
              Đăng nhập ngay!
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

export default connect(null, mapDispatchToProps)(Register);
