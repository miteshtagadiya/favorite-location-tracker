import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../../Ui/Header/Header";
import {
  Button,
  Divider,
  Paper,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { AddOutlined } from "@material-ui/icons";
import Map from "../Maps/Map.jsx";
import MapCard from "../../Ui/Card/MapCard";
import Card from "../../Ui/Card/Card";
import Modal from "../../Ui/Modal/Modal";
import { auth } from "firebase";
import { db } from "../../../services/firebase";
import "./Home.sass";

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
  const [open, setOpen] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [currentLocation, setCurrentLocation] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLocationSelected, setIsLocationSelected] = React.useState(false);
  const [location, setLocation] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [name, setName] = React.useState("");
  const [user] = React.useState(auth().currentUser);
  const [places, setPlaces] = React.useState([]);
  const [readError, setReadError] = React.useState(null);
  const [writeError, setWriteError] = React.useState(null);
  const [loadingPlaces, setLoadingPlaces] = React.useState(false);
  const [distance, setDistance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setReadError(null);
    setLoadingPlaces(true);
    try {
      db.ref("places").on("value", (snapshot) => {
        let places = [];
        snapshot.forEach((snap) => {
          places.push(snap.val());
        });
        places.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });

        setPlaces(places.filter((place) => place.uid === user.uid));
        setLoadingPlaces(false);
      });
    } catch (error) {
      setReadError(error.message);
      setLoadingPlaces(false);
    }
  }, [user.uid]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(null);
    setLoading(true);

    try {
      db.ref("places").push({
        place: name,
        description: description,
        longitude: location.longitude,
        latitude: location.latitude,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setDescription("");
      setLocation("");
      setName("");
      setLoading(false);
      handleClose();
    } catch (error) {
      setLoading(false);
      setWriteError(error.message);
    }
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root + " Home"}>
      <CssBaseline />
      <Header user={user} />
      <div className={openSidebar ? "openSidebar" : "closeSidebar"}>
        <div className="location-box">
          <div className="location-button">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              startIcon={<AddOutlined />}
            >
              Add New Location
            </Button>
          </div>
          <Divider />
          {!loadingPlaces && places.length === 0 && (
            <div className="textmessage-center">No Favorite Places found.</div>
          )}
          {readError && <div className="textmessage-center">{readError}</div>}
          <div>
            {loadingPlaces === true ? (
              <div className="loader">
                <CircularProgress />
                <div>Loading...</div>
              </div>
            ) : (
              places.map((place, index) => {
                return (
                  <Card
                    name={place.place}
                    description={place.description}
                    lat={place.latitude}
                    long={place.longitude}
                    setSelectedCard={setSelectedCard}
                    setDistance={setDistance}
                    currentLocation={currentLocation}
                    setIsLocationSelected={setIsLocationSelected}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setName={setName}
        setDescription={setDescription}
        name={name}
        description={description}
        location={location}
        setLocation={setLocation}
        handleClose={handleClose}
        handleLocationAdd={(e) => handleSubmit(e)}
        writeError={writeError}
        loading={loading}
      />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container disableGutters maxWidth="xl">
          <Grid container-fluid spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                elevation={3}
                className="sidebar-handler"
                onClick={() => setOpenSidebar(!openSidebar)}
              >
                <AddOutlined />
              </Paper>
              {isLocationSelected && (
                <MapCard selectedCard={selectedCard} distance={distance} />
              )}
              <div style={{ background: "grey" }} />
              {Object.keys(currentLocation).length !== 0 && !loadingPlaces && (
                <Map
                  distance={distance}
                  isLocationSelected={isLocationSelected}
                  selectedCard={selectedCard}
                  currentLocation={currentLocation}
                  cordinates={isLocationSelected ? [] : places}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default Home;
