import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      active: 1,
    };
  }
  componentDidMount() {
    const { search } = this.props.history.location;
    const query = new URLSearchParams(search);
    let active = Number(query.get("page"));
    if (!active) active = 1;
    this.setState({ active }, () => {
      let items = [];
      for (let i = 2; i < this.props.pageNums; i++) {
        if (
          (i >= this.state.active - 1 && i <= this.state.active + 1) ||
          (i <= 4 && this.state.active <= 2) ||
          (i >= this.props.pageNums - 3 && active >= this.props.pageNums - 2)
        )
          items.push(
            <Pagination.Item
              key={i}
              active={i === this.state.active}
              activeLabel=""
              onClick={this.selectPage}
            >
              {i}
            </Pagination.Item>
          );
      }
      this.setState({ items });
    });
  }

  handlePrev = () => {
    const { active } = this.state;
    this.setState({ active: active - 1 }, () => {
      const { history } = this.props;
      history.push(`${history.location.pathname}?page=${this.state.active}`);
    });
  };

  handleNext = () => {
    const { active } = this.state;
    this.setState({ active: active + 1 }, () => {
      const { history } = this.props;
      history.push(`${history.location.pathname}?page=${this.state.active}`);
    });
  };

  selectPage = (e) => {
    const { history } = this.props;
    history.push(`${history.location.pathname}?page=${e.target.innerText}`);
  };

  render() {
    const { history } = this.props;
    const { active } = this.state;
    const { pageNums } = this.props;
    return (
      <div className="d-flex justify-content-center mt-2">
        <Pagination>
          <Pagination.Prev disabled={active === 1} onClick={this.handlePrev} />
          <Pagination.Item
            key={1}
            active={active === 1}
            activeLabel=""
            onClick={this.selectPage}
          >
            {1}
          </Pagination.Item>
          {active <= 3 ? (
            ""
          ) : (
            <Pagination.Ellipsis
              onClick={() =>
                history.push(
                  `${history.location.pathname}?page=${this.state.active - 2}`
                )
              }
            />
          )}
          {this.state.items}
          {active >= pageNums - 2 ? (
            ""
          ) : (
            <Pagination.Ellipsis
              onClick={() =>
                history.push(
                  `${history.location.pathname}?page=${this.state.active + 2}`
                )
              }
            />
          )}
          <Pagination.Item
            key={pageNums}
            active={active === pageNums}
            activeLabel=""
            onClick={this.selectPage}
          >
            {pageNums}
          </Pagination.Item>
          <Pagination.Next
            disabled={this.state.active === this.props.pageNums}
            onClick={this.handleNext}
          />
        </Pagination>
      </div>
    );
  }
}

export default MyPagination;
