import React, { Component } from "react";
import ReactPlayer from "react-player";
import "../css/DisplayTrack.css";
import { Grid, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";

class DisplayTrack extends Component {
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
    const { track } = this.props;
    const trackItem = track ? (
      this.bulidItem(track)
    ) : (
      <h1>Track was not found</h1>
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

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    track: state.tracks.find(track => track.trackId.toString() === id)
  };
};

export default connect(mapStateToProps)(DisplayTrack);
