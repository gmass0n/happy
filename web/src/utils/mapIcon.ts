import Leaflet from 'leaflet';

import { mapMarkerImg } from '../images';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [50, 50],
  iconAnchor: [50, 50],
  popupAnchor: [140, 6]
})
export default mapIcon;