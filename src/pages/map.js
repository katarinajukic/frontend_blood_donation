import React from "react";
import "../assets/styles/map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// kreiranje vlastite ikone za marker
const customIcon = new Icon({
  iconUrl: require("../assets/images/marker.png"),
  iconSize: [38,38] // veličina markera
});

// kreiranje vlastite cluser ikone
const createCustomClusterIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// lokacije markera
const markers = [
  {
    geocode: [45.81950416654669, 15.98354370051265],
    popUp: "Bolnica"//zagreb
  },
  {
    geocode: [45.32743140953542, 14.44223186680268],
    popUp: "Bolnica"//rijeka
  },
  {
    geocode: [45.55519690660048, 18.695536298111424],
    popUp: "Bolnica"//osijek
  },
  {
    geocode: [43.514980908942185, 16.444962786567707],
    popUp: "Bolnica"//Split
  },
  {
    geocode: [44.117921754495335, 15.23207797232819],
    popUp: "Bolnica"//zadar
  },
  {
    geocode: [46.30600625796614, 16.33831747300043],
    popUp: "Bolnica"//varaždin
  },
  {
    geocode: [44.8670771873936, 13.847031924426691],
    popUp: "Crveni križ"//pula
  },
  {
    geocode: [42.650421508106795, 18.09421805844867],
    popUp: "Crveni križ"//dubrovnik
  },
  {
    geocode: [43.73559802047331, 15.895339785768769],
    popUp: "Crveni križ"//šibenik
  },
  {
    geocode: [45.89892250246569, 16.841670488417105],
    popUp: "Crveni križ"//bjelovar
  },
  {
    geocode: [45.49386400336867, 15.551334119655207],
    popUp: "Crveni križ"//karlovac
  },
  {
    geocode: [46.16413283236656, 16.836972000415578],
    popUp: "Crveni križ"//koprivnica
  },
  {
    geocode: [45.48539710840609, 16.372352471626172],
    popUp: "Crveni križ"//sisak
  },
  {
    geocode: [45.161876046027054, 18.01190818158422],
    popUp: "Crveni križ"//slavonski br
  },
  {
    geocode: [45.28779283817964, 18.804684615085034],
    popUp: "Crveni križ"//vinkovci
  },
  {
    geocode: [46.38949432050757, 16.437049666437222],
    popUp: "Crveni križ"//čakovec
  },
  {
    geocode: [44.54727280326942, 15.374520897692022],
    popUp: "Crveni križ"//gospic
  },
  {
    geocode: [46.160629557273374, 15.871952372011668],
    popUp: "Crveni križ"//krapina
  },
  {
    geocode: [45.33129808083828, 17.675453483053108],
    popUp: "Crveni križ"//pozega
  },
  {
    geocode: [43.702443888255125, 16.63641906036788],
    popUp: "Crveni križ"//sinj
  },
  {
    geocode: [45.70280707442496, 17.70634732627837],
    popUp: "Crveni križ"//slatina
  },
  {
    geocode: [45.831243809096726, 17.38774103235133],
    popUp: "Crveni križ"//virovitica
  },
  {
    geocode: [45.34609573124437, 18.997615042491798],
    popUp: "Crveni križ"//vukovar
  },
  {
    geocode: [45.85733794978047, 15.803983517975627],
    popUp: "Crveni križ"//zapresic
  }
];

const Map = () => {


  return (
    <div className="map">
      <MapContainer center={[44.700266930700295, 16.683446965705727]} zoom={8}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;