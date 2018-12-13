import React, { Component } from "react";
import TracksList from "./TracksList";
import axios from "axios";
import SearchTracks from "./SearchTracks";
import { Grid, Row } from "react-bootstrap";
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
          `https://itunes.apple.com/search?term=${s}&limit=25&entity=musicTrack`,
          { croosdomain: true }
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
      },
      croosdomain: true
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
          <div className="searchPanels">
            <SearchTracks search={this.updateQuery} />
            <TopTen select={this.updateQuery} />
          </div>

          <TracksList tracks={this.state.tracks} />
        </Row>
      </Grid>
    );
  }
}

export default Home;
