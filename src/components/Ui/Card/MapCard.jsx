import React from "react";
import { Paper } from "@material-ui/core";

const MapCard = (props) => {
  return (
    <Paper
      style={{
        position: "absolute",
        marginTop: 50,
        zIndex: 1,
        marginLeft: 40,
        width: 280,
      }}
    >
      <div style={{ padding: 15 }}>
        <label style={{ fontSize: 16, fontWeight: "bold" }}>
          {props.selectedCard.name}
        </label>
        <br />
        <label>{props.selectedCard.description}</label>
        <br />
        <label>
          <span style={{ fontWeight: "bold" }}>latitude: </span>
          {props.selectedCard.lat}
        </label>
        <br />
        <label>
          <span style={{ fontWeight: "bold" }}>longitude: </span>
          {props.selectedCard.long}
        </label>
        <br />
        <label>
          Distance between your location and {props.selectedCard.name} is{" "}
          <span style={{ fontWeight: "bold" }}>
            {(props.distance * 0.001).toFixed(2)} Kilometers
          </span>
        </label>
      </div>
    </Paper>
  );
};

export default MapCard;
