import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { mapMarkerImg } from '../../images'

import { mapIcon } from '../../utils';

import { api } from '../../services';

import './styles.css';

interface IOrphanage {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  
  useEffect(() => {
    api.get('/orphanages').then(response => setOrphanages(response.data));
  }, [])

  console.log(orphanages);

  return (
    <div id="orphanages-page">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy"/>
        
          <h2>Escolha um orfanato no mapa</h2>

          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Rio do Sul</strong>
          
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map center={[-22.7288143, -46.912379]} zoom={15} className="orphanages-map">
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => (
          <Marker position={[orphanage.latitude, orphanage.longitude]} icon={mapIcon} key={orphanage.id}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="orphanages-map-popup">
              {orphanage.name}
              
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus />
      </Link>
    </div>
  );
}

export default OrphanagesMap; 