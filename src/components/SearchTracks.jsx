import React, { Component } from "react";
import { FormGroup, FormControl, Button, Glyphicon } from "react-bootstrap";
import "../css/SearchTracks.css";

class SearchTracks extends Component {
  state = {
    query: null,
    hasSubmited: false
  };

  input;

  handleChange = e => {
    if (e.target.value.trim() !== "") {
      this.setState({
        [e.target.id]: e.target.value.trim()
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    this.setState({ hasSubmited: true });

    if (query && query.trim() !== "") {
      this.input.value = "";
      this.props.search(query);
    }
  };

  getValidationState = () => {
    if (this.state.hasSubmited) {
      if (!this.state.query || this.state.query.trim() === "") {
        return "error";
      }
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} id="searchForm">
        <FormGroup
          controlId="query"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            placeholder="Search..."
            onChange={this.handleChange}
            inputRef={ref => (this.input = ref)}
          />
        </FormGroup>
        <Button type="submit">
          <Glyphicon glyph="search" />
        </Button>
      </form>
    );
  }
}

export default SearchTracks;
