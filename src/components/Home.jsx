import React, { Component } from "react";
import TracksList from "./TracksList";
import axios from "axios";
import SearchTracks from "./SearchTracks";
import { Grid, Row, Col } from "react-bootstrap";
import "../css/Home.css";
import TopTen from "./TopTen";

class Home extends Component {
  state = {
    query: null,
    tracks: null
  };

  componentDidUpdate() {
    if (this.state.query) {
      this.saveQueryToDb();
      const s = this.state.query.replace(" ", "+");
      axios
        .get(
          `https://itunes.apple.com/search?term=${s}&limit=25&entity=musicTrack`
        )
        .then(res => res.data)
        .then(data => {
          if (data && data.resultCount > 0) {
            let tracksArr = [];
            data.results.forEach(track => {
              tracksArr.push(track);
            });
            this.setState({ tracks: tracksArr, query: null });
          }
        })
        .catch(error => console.log(`Searching tracks error: ${error}`));
    }
  }

  updateQuery = query => {
    this.setState({ query });
  };

  saveQueryToDb = () => {
    axios({
      method: "post",
      url: "http://localhost:8080/addSearch",
      data: {
        query: this.state.query
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(`Adding search to db error: ${error}`));
  };

  render() {
    return (
      <Grid id="home">
        <Row>
          <Col xs={12} md={10}>
            <SearchTracks search={this.updateQuery} />
          </Col>
          <Col xs={12} md={2}>
            <TopTen select={this.updateQuery} />
          </Col>
          <Col xs={12}>
            <TracksList tracks={this.state.tracks} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
