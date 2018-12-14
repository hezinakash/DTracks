import React, { Component } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "../css/DisplayTrack.css";
import { Grid, Row, Col, Image } from "react-bootstrap";

class DisplayTrack extends Component {
  state = {
    track: null,
    hasError: false
  };

  componentDidMount() {
    axios
      .get(`https://itunes.apple.com/lookup?id=${this.props.match.params.id}`)
      .then(res => res.data)
      .then(data => {
        this.setState({ track: data.results[0], hasError: false });
      })
      .catch(error => {
        this.setState({ hasError: true });
        console.log(`Track error: ${error}`);
      });
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  bulidItem = track => {
    return (
      <React.Fragment>
        <Row>
          <Col xs={12} md={4}>
            <Image src={track.artworkUrl60} responsive />;
          </Col>
          <Col xs={12} md={8}>
            <Row className="track-info">
              <Col xs={12} sm={6}>
                <label>Artist: </label>
                <label>{track.artistName}</label>
              </Col>
              <Col xs={12} sm={6}>
                <label>Track: </label>
                <label>{track.trackName}</label>
              </Col>
              <Col xs={12} sm={6}>
                <label>Collection: </label>
                <label>{track.collectionName}</label>
              </Col>
              <Col xs={12} sm={6}>
                <label>Genre: </label>
                <label>{track.primaryGenreName}</label>
              </Col>
              <Col xs={12} sm={6}>
                <label>Duration: </label>
                <label>
                  {this.millisToMinutesAndSeconds(track.trackTimeMillis)}
                </label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <div className="player-wrapper">
            <ReactPlayer url={track.previewUrl} playing controls volume={0.5} />
          </div>
        </Row>
      </React.Fragment>
    );
  };

  render() {
    const { track, hasError } = this.state;
    const trackItem = track ? (
      this.bulidItem(track)
    ) : hasError ? (
      <h1>Track was not found</h1>
    ) : (
      <h1>Loading...</h1>
    );
    return (
      <Grid className="track-wrapper">
        <Row>
          <Col xs={10} md={8} className="track">
            {trackItem}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DisplayTrack;
