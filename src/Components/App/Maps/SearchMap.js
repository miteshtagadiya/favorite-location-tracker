import React, { Component, memo } from "react";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");

class MapWithSearch extends Component {
  state = {
    isLocationSelected: this.props.isLocationSelected,
    selectedCard: this.props.selectedCard,
    currentLocation: this.props.currentLocation,
    cordinates: this.props.isLocationSelected ? [] : this.props.cordinates,
  };

  componentWillUpdate(nextProps, nextState) {
    if (
      nextProps.isLocationSelected !== this.props.isLocationSelected ||
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
          <div style={{ height: `300px`, overflowY: "hidden" }} />
        ),
        mapElement: <div style={{ height: `100%` }} />,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {};

          this.setState({
            bounds: null,
            center: {
              lat: 41.9,
              lng: -87.624,
            },
            markers: [],
            onMapMounted: (ref) => {
              refs.map = ref;
            },
            onBoundsChanged: () => {
              this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
              });
            },
            onSearchBoxMounted: (ref) => {
              refs.searchBox = ref;
            },
            onPlacesChanged: () => {
              console.log(this.props);

              const places = refs.searchBox.getPlaces();
              // eslint-disable-next-line no-undef
              const bounds = new google.maps.LatLngBounds();

              places.forEach((place) => {
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              const nextMarkers = places.map((place) => ({
                position: place.geometry.location,
              }));
              const nextCenter = _.get(
                nextMarkers,
                "0.position",
                this.state.center
              );
              this.props.onSelect(nextMarkers[0]);
              this.setState({
                center: nextCenter,
                markers: nextMarkers,
              });
              // refs.map.fitBounds(bounds);
            },
          });
        },
      }),
      withScriptjs,
      withGoogleMap
    )((props) => (
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          // eslint-disable-next-line no-undef
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {props.markers.map((marker, index) => (
          <Marker key={index} position={marker.position} />
        ))}
      </GoogleMap>
    ));
    return <App select={this.props.select} onSelect={this.props.onSelect} />;
  }
}

export default memo(
  MapWithSearch,
  (prevProps, nextProps) => prevProps.onSelect !== nextProps.onSelect
);
