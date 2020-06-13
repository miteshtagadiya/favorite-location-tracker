import React, { Component, memo } from "react";

const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} = require("react-google-maps");

class Map extends Component {
  state = {
    isLocationSelected: this.props.isLocationSelected,
    selectedCard: this.props.selectedCard,
    currentLocation: this.props.currentLocation,
    cordinates: this.props.isLocationSelected ? [] : this.props.cordinates,
  };

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps.isLocationSelected);
    console.log(this.props.isLocationSelected);
    console.log(nextProps.selectedCard);
    console.log(this.props.selectedCard);
    console.log(
      nextProps.isLocationSelected !== this.props.isLocationSelected &&
        nextProps.selectedCard !== this.props.selectedCard
    );
    if (
      nextProps.isLocationSelected !== this.props.isLocationSelected &&
      nextProps.selectedCard !== this.props.selectedCard
    ) {
      this.setState({
        isLocationSelected: nextProps.isLocationSelected,
        selectedCard: nextProps.selectedCard,
        currentLocation: nextProps.currentLocation,
        cordinates: nextProps.cordinates,
      });
    }
  }

  render() {
    const App = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBTXgToEN4wP-iI0iG245T7sgx2KapsPGE&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: (
          <div style={{ height: `87vh`, overflowY: "hidden" }} />
        ),
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) => (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={
          this.state.cordinates.length === 0
            ? {
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng,
              }
            : {
                lat: this.state.cordinates[0].lat,
                lng: this.state.cordinates[0].lng,
              }
        }
      >
        {this.state.isLocationSelected === false
          ? this.state.cordinates.map((cord, index) => {
              return (
                <Marker
                  key={index}
                  position={{ lat: cord.lat, lng: cord.lng }}
                />
              );
            })
          : null}
        {this.state.isLocationSelected && (
          <>
            <Marker
              position={{
                lat: this.state.currentLocation.lat,
                lng: this.state.currentLocation.lng,
              }}
            />
            <Marker
              position={{
                lat: this.state.selectedCard.lat,
                lng: this.state.selectedCard.long,
              }}
            />
            <Polyline
              path={[
                {
                  lat: this.state.currentLocation.lat,
                  lng: this.state.currentLocation.lng,
                },
                {
                  lat: this.state.selectedCard.lat,
                  lng: this.state.selectedCard.long,
                },
              ]}
            />
          </>
        )}
      </GoogleMap>
    ));
    return <App />;
  }
}

export default memo(
  Map,
  (prevProps, nextProps) => prevProps.selectedCard === nextProps.selectedCard
);
