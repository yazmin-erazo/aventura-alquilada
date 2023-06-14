import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./ProductMap.module.css";
import customStyles from "./mapbox-gl-custom.css?inline";
import CategoryService from "../../../shared/services/CategoryService";
import * as ReactIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import { createRoot } from "react-dom/client";
import { BiPin } from "react-icons/bi";

const iconComponents = {
  ...ReactIcons,
  ...TbIcons,
  ...FaIcons,
};

const ProductMap = ({
  latitude,
  longitude,
  cityA,
  country,
  product,
  userLocation,
}) => {
  const mapContainerRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingRoute, setShowingRoute] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const allCategories = await CategoryService.getAll();
        setCategories(allCategories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error retrieving categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const productCategory = categories.find(
    (category) => category.name === product.category
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v10", // mapbox://styles/mapbox/streets-v12
      center: [longitude, latitude],
      zoom: 9,
    });

    // -------------------- Start MARKER --------------------
    const markerElement = document.createElement("div");
    markerElement.className = styles.customMarker;

    const pinElement = document.createElement("div");
    pinElement.className = styles.customMarkerPin;
    markerElement.appendChild(pinElement);

    const iconElement = document.createElement("div");
    iconElement.className = styles.customMarkerIcon;

    if (productCategory && productCategory.icon) {
      const IconComponent = iconComponents[productCategory.icon];
      const iconSize = 24;
      const iconColor = "var(--semantics-success)";
      const iconContainer = document.createElement("div");

      createRoot(iconContainer).render(
        <IconComponent size={iconSize} color={iconColor} />
      );
      iconElement.appendChild(iconContainer);
    }

    markerElement.appendChild(iconElement);

    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([longitude, latitude])
      .addTo(map);
    // -------------------- End MARKER --------------------

    // -------------------- Start POP UP --------------------

    const popupContent = `
    <div class="${styles.popup}">
      <h3 class="${styles.popupTitle}">Información del lugar</h3>
      <p class="${styles.popupText}">Ciudad: ${cityA}</p>
      <p class="${styles.popupText}">País: ${country}</p>
      <p class="${styles.popupText}">Latitud: ${latitude}</p>
      <p class="${styles.popupText}">Longitud: ${longitude}</p>
    </div>
    `;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

    marker.setPopup(popup);
    // -------------------- End POP UP --------------------

    // ---------------- Start FLY TO LOCATION --------------
    marker.getElement().addEventListener("click", () => {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 0.9,
      });
    });
    // ---------------- End FLY TO LOCATION --------------

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl());

    // Mostrar ruta al hacer clic en el botón
    const showRoute = () => {
      if (userLocation) {
        const startLngLat = [userLocation.longitude, userLocation.latitude];
        const endLngLat = [longitude, latitude];

        if (map.getLayer("route")) {
          // La capa de ruta ya existe, por lo tanto, la ruta está siendo mostrada
          // Remover la capa y la fuente de la ruta
          map.removeLayer("route");
          map.removeSource("route");
        } else {
          // La capa de ruta no existe, por lo tanto, la ruta no está siendo mostrada
          // Agregar la fuente y la capa de la ruta
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [startLngLat, endLngLat],
              },
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "green",
              "line-width": 4,
            },
          });

          // Ajusta el mapa para mostrar la ruta completa
          const bounds = new mapboxgl.LngLatBounds(startLngLat, endLngLat);
          map.fitBounds(bounds, { padding: 50 });
        }
      }
    };

    // Actualizar el estado de showingRoute

    // Función para ir a la ubicación del producto
    const goToProductLocation = () => {
      map.flyTo({
        center: [longitude, latitude],
        zoom: 14,
        speed: 0.9,
      });
    };

    // Agregar evento de clic al botón
    const locationButton = document.getElementById("locationButton");
    if (locationButton) {
      locationButton.addEventListener("click", goToProductLocation);
    }

    // Agrego evento clic al botón
    const routeButton = document.getElementById("routeButton");
    if (routeButton) {
      routeButton.addEventListener("click", showRoute);
    }

    return () => {
      // Eliminar el evento de clic al desmontar el componente
      if (routeButton) {
        routeButton.removeEventListener("click", showRoute);
      }
      map.remove();
    };

    // Elimine el mapa cuando el componente se desmonte
  }, [latitude, longitude, cityA, country, productCategory]);

  return (
    <>
      <div ref={mapContainerRef} className={styles.mapContainer}></div>
      <div className={styles.ContainerButtons}>
        <button id="locationButton" className={styles.itemButton}>
          <div className={styles.iconContainer}>
            <BiPin size={22} />
          </div>
          Ubicación producto
        </button>
        <button
          id="routeButton"
          className={styles.itemButton}
          onClick={() => setShowingRoute(!showingRoute)}
        >
          <div className={styles.iconContainer}>
            {showingRoute ? <FaIcons.FaEyeSlash /> : <FaIcons.FaRoute />}{" "}
          </div>
          {showingRoute ? "Ocultar ruta" : "Mostrar ruta"}
        </button>
      </div>
    </>
  );
};

export default ProductMap;
