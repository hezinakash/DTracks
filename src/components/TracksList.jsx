import React from "react";
import TrackItem from "./TrackItem";
import { Grid, Row, Col } from "react-bootstrap";
import "../css/TracksList.css";

const TracksList = props => {
  const items = props.tracks ? (
    props.tracks.map(item => {
      return (
        <Col xs={12} lg={2} key={item.trackId}>
          <TrackItem track={item} />
        </Col>
      );
    })
  ) : (
    <h1>Search for tracks</h1>
  );

  return (
    <Grid fluid>
      <Row>
        <Col xs={12} className="tracks">
          <Row>{items}</Row>
        </Col>
      </Row>
    </Grid>
  );
};

export default TracksList;
