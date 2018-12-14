import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "../css/NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/DTracks">Tracks</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }

  handleSubmit = ({ query }) => {
    this.props.submit(query);
  };
}

export default withRouter(NavBar);
