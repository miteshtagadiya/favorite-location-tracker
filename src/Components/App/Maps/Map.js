import React, { Component } from "react";

const { compose, withProps } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

class App1 extends Component {
  state = {
    cordinates: this.props.cordinates,
  };

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
        defaultCenter={{
          lat: this.state.cordinates[0].lat,
          lng: this.state.cordinates[0].lng,
        }}
      >
        {this.state.cordinates.map((cord, index) => {
          return (
            <Marker key={index} position={{ lat: cord.lat, lng: cord.lng }} />
          );
        })}
      </GoogleMap>
    ));
    return <App />;
  }
}

export default App1;
