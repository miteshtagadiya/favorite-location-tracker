import React from "react";
import { Paper } from "@material-ui/core";
import "./Card.sass";

const MapCard = (props) => {
  return (
    <Paper className="MapCard">
      <div style={{ padding: 15 }}>
        <label className="font-bold font-label">
          {props.selectedCard.name}
        </label>
        <br />
        <label>{props.selectedCard.description}</label>
        <br />
        <label>
          <span className="font-bold">latitude: </span>
          {props.selectedCard.lat}
        </label>
        <br />
        <label>
          <span className="font-bold">longitude: </span>
          {props.selectedCard.long}
        </label>
        <br />
        <label>
          Distance between your location and {props.selectedCard.name} is{" "}
          <span className="font-bold">
            {(props.distance * 0.001).toFixed(2)} Kilometers
          </span>
        </label>
      </div>
    </Paper>
  );
};

export default MapCard;
