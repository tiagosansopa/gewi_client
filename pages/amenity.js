import AuthContext from "../context/AuthContext";
import { amenityStyles } from "../styles";

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DUMMY_AMENITIES } from "../dummy";

const Amenity = () => {
  const router = useRouter();
  const { setAmenity, amenity } = useContext(AuthContext);

  const handleAmenity = (amenity) => {
    setAmenity(amenity);
  };

  return (
    <div className={amenityStyles.container}>
      <div className={amenityStyles.messageHeader}>
        <div className={amenityStyles.leftArrow}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => router.push("/home")}
          />
        </div>
        <div className={amenityStyles.header}>
          <h1>Amenidades</h1>
        </div>
      </div>
      {amenity === undefined && (
        <div className={amenityStyles.amenityContainer}>
          {DUMMY_AMENITIES.map((item) => {
            return (
              <div
                className={amenityStyles.photoscontainerWrap}
                onClick={() => {
                  handleAmenity(item);
                }}
              >
                <div key={item.id} className={amenityStyles.photoscontainer}>
                  <p>{item.name}</p>
                  <img src={item.img} />
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {amenity !== undefined && (
        <div className={amenityStyles.container}>
          <div className={amenityStyles.amenityContainer}>
            <div key={amenity.id} className={amenityStyles.photoscontainer}>
              <p>{amenity.name}</p>
              <img src={amenity.img} />
              <p>{amenity.description}</p>
            </div>
            <div>
              <h5>Servicios Disponibles</h5>
              <p>dfsiojofdsajifpdsjaofidja</p>
              <h5>Informacion adicional y reglamento</h5>
              <p>fdsfdsafdafda</p>
            </div>
          </div>
          <h1>Agendar</h1>
          <div className={amenityStyles.amenityContainer}>
            <DatePicker inline />
            <label htmlFor="hora">Hora</label>
            <input type="time" id="hora" name="hora" />
            <button>Agendar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenity;
