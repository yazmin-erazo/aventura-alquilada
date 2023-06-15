import React, { useState } from 'react';

import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap, ZoomControl } from 'react-leaflet';
import styles from "./MapComponent.module.css";

function MapComponent() {
    const [city, setCity] = useState('');
  
    function handleMapClick(e) {
      console.log(e.latlng);
      const { lat, lng } = e.latlng;
  
      // Reverse geocoding API request
      const apiKey = '5802fbfcfcecda1c50e493bf66b80884'; // Replace with your actual API key
      const apiUrl = `http://api.positionstack.com/v1/reverse?access_key=${apiKey}&query=${lat},${lng}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK' && data.results.length > 0) {
            // Extract the city from the address components
            const addressComponents = data.results[0].address_components;
            const cityComponent = addressComponents.find(component =>
              component.types.includes('locality')
            );
  
            if (cityComponent) {
              setCity(cityComponent.long_name);
            } else {
              setCity('City not found.');
            }
          } else {
            setCity('Error occurred during geocoding.');
          }
        })
        .catch(error => {
          setCity('Error occurred during geocoding: ' + error);
        });
    }
  
    function LocationMarker() {
      useMapEvents({
        click: handleMapClick
      });
  
      return null;
    }

    const position = [51.505, 19];
  
    return (
      <div>
        
        <MapContainer style={{height:100}} center={position} zoom={4} maxZoom={18} scrollWheelZoom={false} onClick={handleMapClick}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data © OpenStreetMap contributors"
          />
          <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
          
        </MapContainer>
        <p>City: {city}</p>
      </div>
    );
  }
  
  export default MapComponent;