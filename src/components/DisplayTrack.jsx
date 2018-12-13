import React, { Component } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import "../css/DisplayTrack.css";
import { Col } from "react-bootstrap";

class DisplayTrack extends Component {
  state = {
    track: null
  };

  componentDidMount() {
    axios
      .get(`https://itunes.apple.com/lookup?id=${this.props.match.params.id}`, {
        croosdomain: true,
        header: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.data)
      .then(data => {
        this.setState({ track: data.results[0] });
      })
      .catch(error => console.log(`Track error: ${error}`));
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  bulidItem = track => {
    return (
      <React.Fragment>
        <div className="top">
          <Col xs={12} sm={4} lg={3} className="partA">
            <div className="img-wrapper">
              <img src={track.artworkUrl100} alt={track.trackName} />
            </div>
          </Col>
          <Col xs={12} sm={8} lg={9} className="partB">
            <div className="track-info">
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
            </div>
          </Col>
        </div>
        <div className="bottom">
          <div className="player-wrapper">
            <ReactPlayer url={track.previewUrl} playing controls volume={0.5} />
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { track } = this.state;
    const trackItem = track ? (
      this.bulidItem(track)
    ) : (
      <h1>Track was not found</h1>
    );
    return (
      <Col xs={12} lg={8} className="track-wrapper">
        <div className="track">
          <div className="content">{trackItem}</div>
        </div>
      </Col>
    );
  }
}

export default DisplayTrack;
