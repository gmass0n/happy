import React, { useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

import { Sidebar } from "../../components";

import { api } from "../../services";

import { mapIcon } from "../../utils";

import "./styles.css";

interface IOrphanage {
  name: string;
  about: string;
  instructions: string;
  open_on_weekends: boolean;
  latitude: number;
  longitude: number;
  opening_hours: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface IParams {
  id: string;
}

export default function Orphanage() {
  const { id } = useParams<IParams>();

  const [orphanage, setOrphanage] = useState<IOrphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api
      .get(`/orphanages/${id}`)
      .then((response) => setOrphanage(response.data));
  }, [id]);

  if (!orphanage) {
    return <h1>Carregando</h1>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
 
      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((orphanageImage, orphanageImageIndex) => (
              <button 
                {...(activeImageIndex === orphanageImageIndex && { className: 'active' })}
                type="button" 
                key={orphanageImage.id}
                onClick={() => setActiveImageIndex(orphanageImageIndex)}
              >
                <img src={orphanageImage.url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>

            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#ff669d" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}
