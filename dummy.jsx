import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Circle, GoogleMap, MarkerF } from "@react-google-maps/api";
import MapCSS from "./Map.module.css";
import homeLocatorImage from "../images/home_locator.png";

const Map = ({ zoom, markers }) => {
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef();

  console.log(currentLocation);

  const options = useMemo(
    () => ({
      mapId: "f50eb586eb2b2813",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [markers]);

  const center = useMemo(
    () => currentLocation || { lat: 6.9271, lng: 79.8612 },
    [currentLocation]
  );
  // Use useEffect to add or update markers on the map
  useEffect(() => {
    if (map) {
      // Clear existing markers
      mapMarkers.forEach((marker) => {
        marker.setMap(null);
      });

      // Add markers to the map
      const newMarkers = markers.map((marker, index) => {
        const googleMarker = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.pharmacyName, // Set the marker title to the pharmacyName
        });

        return googleMarker;
      });

      // Set the new markers in the state
      setMapMarkers(newMarkers);
    }
  }, [map, markers]);

  // Function to get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };

  return (
    <div className={MapCSS["map"]}>
      <GoogleMap
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={onLoad}
        options={options}
      >
        <MarkerF
          position={{
            lat: center.lat,
            lng: center.lng,
          }}
          icon={{
            url: homeLocatorImage,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          title="Current Location"
        />

        {markers && (
          <>
            <Circle center={center} radius={15000} options={closeOptions} />
            <Circle center={center} radius={30000} options={middleOptions} />
            <Circle center={center} radius={45000} options={farOptions} />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

Map.defaultProps = {
  zoom: 12,
  markers: [],
};

export default Map;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
