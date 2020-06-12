import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../../Ui/Header/Header";
import { Button, Divider, Paper, Container, Grid } from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import Map from "../Maps/Map";
import MapCard from "../../Ui/Card/MapCard";
import { getDistanceBetweenPoints } from "../../../utils/utils";

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
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [distance, setDistance] = React.useState(0);
  const [isLocationSelected, setIsLocationSelected] = React.useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        setCurrentLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    } else {
      console.log("error");
    }
  }, []);

  const renderCard = (place, description, lat, lng) => {
    return (
      <Paper elevation={3}>
        <div
          onClick={() => {
            setSelectedCard({
              name: place,
              description: description,
              lat: lat,
              long: lng,
            });
            setDistance(
              getDistanceBetweenPoints(
                currentLocation.lat,
                currentLocation.lng,
                lat,
                lng
              )
            );
            setIsLocationSelected(true);
          }}
          style={{ padding: 10, marginTop: 10 }}
        >
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

  let cordinates = [
    { lat: 12.12, lng: 76.68 },
    { lat: 24.879999, lng: 74.629997 },
    { lat: 16.994444, lng: 73.300003 },
    { lat: 19.155001, lng: 72.849998 },
    { lat: 24.7945, lng: 73.055 },
    { lat: 21.25, lng: 81.629997 },
    { lat: 16.1667, lng: 74.833298 },
    { lat: 26.85, lng: 80.949997 },
    { lat: 28.610001, lng: 77.230003 },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header user={"user"} />
      <div
        style={
          openSidebar
            ? {
                width: 300,
                height: "100vh",
                overflowY: "auto",
                background: "white",
              }
            : { display: "none" }
        }
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container disableGutters maxWidth="xl">
          <Grid container-fluid spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                elevation={3}
                style={{
                  height: 35,
                  width: 35,
                  background: "white",
                  marginTop: 10,
                  position: "absolute",
                  zIndex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                onClick={() => setOpenSidebar(!openSidebar)}
              >
                <AddOutlined />
              </Paper>
              <MapCard selectedCard={selectedCard} distance={100} />
              <div style={{ background: "grey" }} />
              <Map
                distance={distance}
                isLocationSelected={isLocationSelected}
                selectedCard={selectedCard}
                currentLocation={currentLocation}
                cordinates={isLocationSelected ? [] : cordinates}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;
