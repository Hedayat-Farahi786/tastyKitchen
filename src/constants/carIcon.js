import L from 'leaflet';
import car from "../assets/car.png"


const carIcon = new L.Icon({
    iconUrl: car,
    iconRetinaUrl: car,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { carIcon };