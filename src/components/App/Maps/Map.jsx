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
          "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&v=3.exp&libraries=geometry,drawing,places",
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
                lat: this.state.cordinates[0].latitude,
                lng: this.state.cordinates[0].longitude,
              }
        }
      >
        {this.state.isLocationSelected === false
          ? this.state.cordinates.map((cord, index) => {
              return (
                <Marker
                  key={index}
                  position={{ lat: cord.latitude, lng: cord.longitude }}
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
  (prevProps, nextProps) => prevProps.selectedCard === nextProps.selectedCard && prevProps.cordinates === nextProps.cordinates
);
