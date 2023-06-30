import React, { useState } from 'react';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']; // Specify any additional libraries you need

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 33.871891625042686,
  lng: 10.860368009704592,
};

export default function AjouteMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDF7JeM5j8kRhyt89EkIVgjlnVl2_wAZPE',
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(center);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const handleMapClick = (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(clickedLatLng);
    console.log(clickedLatLng.lat);
    console.log(clickedLatLng.lng);
  };

  return (
    <MDBRow className='w-100'>
      <MDBCol>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        ) : (
          <div>Loading maps...</div>
        )}
      </MDBCol>
    </MDBRow>
  );
}
