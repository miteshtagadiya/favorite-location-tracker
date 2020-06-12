import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../../Ui/Header/Header";
import { Button, Divider, Paper } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  const renderCard = (place, description, lat, lng) => {
    return (
      <Paper elevation={3}>
        <div style={{ padding: 10, marginTop: 10 }}>
          <label style={{ fontSize: 16, fontWeight: "bold" }}>{place}</label>
          <br />
          <label>{description}</label>
          <br />
          <label>
            <span style={{ fontWeight: "bold" }}>latitude: </span>
            {lat}
          </label>
          <br />
          <label>
            <span style={{ fontWeight: "bold" }}>longitude: </span>
            {lng}
          </label>
        </div>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header user={"user"} />
      <div
        style={{
          width: 300,
          height: "100vh",
          overflowY: "auto",
          background: "white",
        }}
      >
        <div style={{ marginTop: 65, padding: 15 }}>
          <div style={{ textAlign: "center", marginBottom: 15 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddOutlined />}
            >
              Add New Location
            </Button>
          </div>
          <Divider />
          <div>
            {renderCard("My Place", "Description", 23.453, 12, 8786)}
            {renderCard("My Place", "Description", 23.453, 12, 8786)}
            {renderCard("My Place", "Description", 23.453, 12, 8786)}
            {renderCard("My Place", "Description", 23.453, 12, 8786)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
