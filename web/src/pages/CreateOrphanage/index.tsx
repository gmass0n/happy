import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { useHistory } from "react-router-dom";

import { Sidebar } from "../../components";

import { mapIcon } from "../../utils";

import { api } from "../../services";

import "./styles.css";

interface IFormData {
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: File[];
}

interface IPosition {
  latitude: number;
  longitude: number;
}

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState<IPosition>({
    latitude: 0,
    longitude: 0
  });
  const [currentPosition, setCurrentPosition] = useState<IPosition>({
    latitude: 0,
    longitude: 0
  })
  const [formData, setFormData] = useState<IFormData>({
    about: "",
    instructions: "",
    name: "",
    opening_hours: "",
    open_on_weekends: false,
    images: [],
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    }
  }, [])

  const handleClickMap = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }, []);

  const handleChangeInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;

      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleChangeOpenOnWeekends = useCallback((open: boolean) => {
    setFormData((prevState) => ({
      ...prevState,
      open_on_weekends: open,
    }));
  }, []);

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const images = Array.from(event.target.files as FileList);

      setFormData((prevState) => ({
        ...prevState,
        images,
      }));

      const selectedImagesPreview = images.map((image) => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const {
        about,
        images,
        instructions,
        name,
        open_on_weekends,
        opening_hours,
      } = formData;
      const { latitude, longitude } = position;

      const data = new FormData();

      data.append("name", name);
      data.append("about", about);
      data.append("instructions", instructions);
      data.append("opening_hours", opening_hours);
      data.append("open_on_weekends", String(open_on_weekends));
      data.append("latitude", String(latitude));
      data.append("longitude", String(longitude));
      images.forEach((image) => data.append("images", image));

      await api.post('orphanages', data);

      alert('Cadastro realizado com sucesso!')

      history.push('/orphanages');
    },
    [formData, position, history]
  );

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[currentPosition.latitude, currentPosition.longitude]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleClickMap}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChangeInputValue}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                name="about"
                value={formData.about}
                onChange={handleChangeInputValue}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((previewImage) => (
                  <img
                    key={previewImage}
                    src={previewImage}
                    alt={formData.name}
                  />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChangeInputValue}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input
                id="opening_hours"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleChangeInputValue}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  {...(formData.open_on_weekends && { className: "active" })}
                  onClick={() => handleChangeOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  {...(!formData.open_on_weekends && { className: "active" })}
                  onClick={() => handleChangeOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
