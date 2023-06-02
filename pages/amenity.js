import AuthContext from "../context/AuthContext";
import { amenityStyles } from "../styles";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DUMMY_AMENITIES } from "../dummy";

const Amenity = () => {
  const { amenity } = useContext(AuthContext);
  return (
    <div>
      {amenity == undefined && (
        <>
          <h1>Bienvenido a amenidades</h1>
          <div>
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
        </>
      )}
      {amenity && (
        <>
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
          <div>
            <h1>Book</h1>
            <DatePicker inline />
            <label htmlFor="hora">Hora</label>
            <input type="time" id="hora" name="hora" />
            <button>Agendar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Amenity;
