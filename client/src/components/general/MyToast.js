import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class MyToast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      localStorage.removeItem("toast");
    }, 3000);
  }

  render() {
    if (!localStorage.getItem("toast")) return "";
    return (
      <Toast
        onClose={() => this.setState({ show: false })}
        show={this.state.show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img
            src="/images/logos/favicon.png"
            className="mr-2"
            alt="logo-app"
          />
          <strong className="mr-auto">MusicRS</strong>
        </Toast.Header>
        <Toast.Body>{localStorage.getItem("toast")}</Toast.Body>
      </Toast>
    );
  }
}
