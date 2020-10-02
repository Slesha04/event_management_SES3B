// https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs

import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '50%',
  height: '50%'
};

class EventMap extends Component {
  constructor() {
    super();
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: "-33.878429",
            lng: "151.183731"
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAUE7ADh4Y-gVM-WUgKhNoG2_6io1SOM-c'
})(EventMap);