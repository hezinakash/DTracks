import React from "react";
import MusicIcon from "../Apple Music.png";
import VideoIcon from "../video icon.png";
import "../css/TrackItem.css";
import { Link } from "react-router-dom";

const TrackItem = ({ track }) => {
  return (
    <Link to={"/DTracks/" + track.trackId} className="card" id={track.trackId}>
      <img
        className="card-img-top"
        src={trackImg(track)}
        alt={track.trackName}
      />
      <div className="card-body">
        <p className="card-text">
          {track.artistName} - {track.trackName}
        </p>
      </div>
    </Link>
  );
};

const trackImg = track => {
  if (track.artworkUrl100) {
    return track.artworkUrl100;
  } else if (track.kind === "song") {
    return MusicIcon;
  } else {
    return VideoIcon;
  }
};

export default TrackItem;
