import React from "react";
import { Paper } from "@material-ui/core";
import { getDistanceBetweenPoints } from "../../../utils/util";

const Card = (props) => {
  return (
    <Paper key={props.lat + props.long} elevation={3}>
      <div
        onClick={() => {
          props.setSelectedCard({
            name: props.name,
            description: props.description,
            lat: props.lat,
            long: props.long,
          });
          props.setDistance(
            getDistanceBetweenPoints(
              props.currentLocation.lat,
              props.currentLocation.lng,
              props.lat,
              props.long
            )
          );
          props.setIsLocationSelected(true);
        }}
        style={{ padding: 10, marginTop: 10 }}
      >
        <label style={{ fontSize: 16, fontWeight: "bold" }}>{props.name}</label>
        <br />
        <label>{props.description}</label>
        <br />
        <label>
          <span style={{ fontWeight: "bold" }}>latitude: </span>
          {props.lat}
        </label>
        <br />
        <label>
          <span style={{ fontWeight: "bold" }}>longitude: </span>
          {props.long}
        </label>
      </div>
    </Paper>
  );
};

export default Card;
