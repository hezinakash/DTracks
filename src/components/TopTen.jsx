import React, { Component } from "react";
import { DropdownButton, MenuItem, ButtonToolbar } from "react-bootstrap";
import axios from "axios";

class TopTen extends Component {
  state = {
    queries: []
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8080/getTopTen`)
      .then(res => {
        if (res) {
          this.setState({ queries: res.data });
        }
      })
      .error(error => console.log(`Top ten error: ${error}`));
  }

  getQueries = (isOpen, e) => {
    if (isOpen) {
      axios
        .get(`http://localhost:8080/getTopTen`)
        .then(res => {
          if (res) {
            this.setState({ queries: res.data });
          }
        })
        .error(error => console.log(`Top ten error: ${error}`));
    }
  };

  handleSelct = (key, e) => {
    e.preventDefault();
    this.props.select(this.state.queries[key]);
  };
  render() {
    const items =
      this.state.queries.length > 0
        ? this.state.queries.map((query, i) => {
            return (
              <MenuItem eventKey={i} key={i} onSelect={this.handleSelct}>
                {query}
              </MenuItem>
            );
          })
        : null;

    return (
      <ButtonToolbar>
        <DropdownButton
          title="Top 10 searching"
          id="topTen"
          onToggle={this.getQueries}
        >
          {items}
        </DropdownButton>
      </ButtonToolbar>
    );
  }
}

export default TopTen;
