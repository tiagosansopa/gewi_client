import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { DUMMY_AMENITIES } from "../dummy";

const Amenity = () => {
  const router = useRouter();
  const { setAmenity, amenity } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const handleAmenity = (amenity) => {
    setAmenity(amenity);
  };

  const OnChangeDate = (e) => {
    const [start, end] = e;
    console.log(start);
    console.log(end);
    setSelectedDate(start);
    setEndDate(end);
    getDayBookings();
  };

  const OnChangeHour = (e) => {
    console.table("uim", e.target.value);
  };
  const getTimezoneString = (offset) => {
    const sign = offset < 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    return `GMT${sign}${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const getDayBookings = async () => {
    console.table(
      "selectedDate",
      getTimezoneString(new Date(selectedDate).getTimezoneOffset()),
      "UIMsss",
      selectedDate.toISOString()
    );
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/bookings`,
        {
          date: selectedDate,
        }
      );

      setReservas((reservas) => reservas.concat(response.data.bookings));
    } catch (error) {
      console.log("Error getting day bookings");
    }
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
            <DatePicker
              selected={selectedDate}
              onChange={OnChangeDate}
              startDate={selectedDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <div className={amenityStyles.flexColumn}>
              <label htmlFor="hora">Hora</label>
              <input
                type="time"
                onChange={OnChangeHour}
                id="hora"
                name="hora"
              />
              <button>Agendar</button>
            </div>
            <div className={amenityStyles.flexColumn}>
              <h5>Espacios ocupados:</h5>
              {reservas.map((booking) => (
                <div key={booking.index} className={amenityStyles.booking}>
                  <span>Nombre: {booking.eventName}</span>
                  <span>
                    Inicio: {booking.start}
                    {console.table(
                      "hola",
                      new Date(booking.start).toISOString().split("T")[0],
                      new Date(booking.start).toLocaleString("default", {
                        month: "long",
                      })
                    )}
                  </span>
                  <span>
                    Fin: {new Date(booking.start).toISOString().split("T")[0]}
                  </span>
                  <span>Amenidad: {booking.amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenity;
