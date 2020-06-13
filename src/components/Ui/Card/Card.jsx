import React from "react";
import { Paper } from "@material-ui/core";
import { getDistanceBetweenPoints } from "../../../utils/utils";
import "./Card.sass";

const Card = (props) => {
  return (
    <Paper className="Card" key={props.lat + props.long} elevation={3}>
      <div
        className="card-main"
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
      >
        <label className="font-bold card-label">{props.name}</label>
        <br />
        <label>{props.description}</label>
        <br />
        <label>
          <span className="font-bold">latitude: </span>
          {props.lat}
        </label>
        <br />
        <label>
          <span className="font-bold">longitude: </span>
          {props.long}
        </label>
      </div>
    </Paper>
  );
};

export default Card;
