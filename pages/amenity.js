import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSpaghettiMonsterFlying,
  faBirthdayCake,
  faPersonBreastfeeding,
} from "@fortawesome/free-solid-svg-icons";

const Amenity = () => {
  const router = useRouter();
  const { setAmenity, amenity } = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  //const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState({ hour: "", minutes: "" });
  const [eventName, setEventName] = useState("");
  const [amenityList, setSetAmenityList] = useState([]);

  const getAmenities = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/amenities`
      );
      setSetAmenityList(response.data.amenities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  const handleTimeChange = (event) => {
    const { value } = event.target;
    const [hour, minutes] = value.split(":"); // Extract the hour and minutes from the input value
    setTime({ hour, minutes });
  };

  const handleAmenity = (amenity) => {
    setAmenity(amenity);
  };

  const handleEventName = (e) => setEventName(e.target.value);

  const OnChangeDate = (e) => {
    //const [start, end] = e;
    setSelectedDate(e);
    // setEndDate(end);

    getDayBookings(e);
  };

  const getTimezoneString = (dateString) => {
    const localTimezoneOffset = new Date().getTimezoneOffset(); // Get local time zone offset in minutes

    const offsetHours = Math.abs(Math.floor(localTimezoneOffset / 60)); // Calculate offset hours
    const offsetMinutes = Math.abs(localTimezoneOffset % 60); // Calculate offset minutes

    const offsetSign = localTimezoneOffset >= 0 ? "-" : "+"; // Determine the offset sign

    const offsetString = `${offsetSign}${offsetHours
      .toString()
      .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`; // Format the offset string

    const dateStringWithOffset = dateString + offsetString; // Concatenate the offset to the date string

    const date = new Date(dateStringWithOffset);

    return date;
  };

  const getDayBookings = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/bookings`,
        {
          selectedDate: new Date(e).toDateString(),
        }
      );
      console.log(response.data.bookings);
      setReservas(response.data.bookings);
    } catch (error) {
      console.log("Error getting day bookings");
    }
  };

  const bookAmenity = async (e) => {
    const dateFormat = new Date(selectedDate).toISOString().split("T")[0];
    const timeFormat = `${time.hour}:${time.minutes}`;
    const format = dateFormat + "T" + timeFormat + ":00.000";
    const finalDate = getTimezoneString(format);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/book`,
        {
          eventName: eventName,
          start: finalDate,
          finish: finalDate,
          amenity: amenity.id,
        }
      );
      getDayBookings();
      window.alert(response.data.message);
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
          {amenityList.map((item) => {
            return (
              <div
                className={amenityStyles.photoscontainerWrap}
                onClick={() => {
                  handleAmenity(item);
                }}
              >
                <div key={item.id} className={amenityStyles.photoscontainer}>
                  <h3>{item.name}</h3>
                  <img src={item.img} className={amenityStyles.imgShadow} />
                  <p>{item.description}</p>
                  <p>Capacidad max: {item.capacity} personas</p>

                  <p>
                    Open from: {item.schedule.open} to: {item.schedule.close}
                  </p>
                  <p>
                    On:
                    {item.weekdays.map((day) => {
                      return <span> {day}, </span>;
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {amenity !== undefined && (
        <div className={amenityStyles.containerNoColor}>
          <div className={amenityStyles.amenityContainer}>
            <div key={amenity.id} className={amenityStyles.photoscontainer}>
              <p>{amenity.name}</p>
              <img src={amenity.img} />
              <p>{amenity.description}</p>
              <p>Capacidad max: {amenity.capacity} personas</p>
            </div>
            <div>
              <h5>Servicios Disponibles</h5>

              <ul>
                {amenity.services.map((service) => {
                  return (
                    <li key={service}>
                      <p>{service}</p>
                    </li>
                  );
                })}
              </ul>
              <span>
                <p>
                  Open from: {amenity.schedule.open} to:{" "}
                  {amenity.schedule.close}
                </p>
              </span>
              <span>
                <p>
                  On:
                  {amenity.weekdays.map((day) => {
                    return <span> {day}, </span>;
                  })}
                </p>
              </span>
            </div>
          </div>
          <h1>Agendar</h1>
          <div className={amenityStyles.amenityContainer}>
            <DatePicker
              selected={selectedDate}
              onChange={OnChangeDate}
              // startDate={selectedDate}
              // endDate={endDate}
              // selectsRange
              inline
            />
            <div className={amenityStyles.flexColumn}>
              <label htmlFor="hora">Hora</label>
              <input
                type="time"
                value={`${time.hour}:${time.minutes}`}
                onChange={handleTimeChange}
                id="hora"
                name="hora"
              />
              <label htmlFor="nombre">Nombre de evento</label>
              <input
                id="nombre"
                name="nombre"
                onChange={handleEventName}
                value={eventName}
              ></input>
              <button onClick={bookAmenity}>Agendar</button>
            </div>
            <div className={amenityStyles.flexColumnBookings}>
              <h5>Espacios ocupados:</h5>
              <div>
                {reservas.map((booking) => (
                  <div key={booking.index} className={amenityStyles.booking}>
                    <p>
                      {Math.floor(Math.random() * 9) % 2 === 0 ? (
                        <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />
                      ) : (
                        <FontAwesomeIcon icon={faBirthdayCake} />
                      )}{" "}
                      {booking.eventName}{" "}
                    </p>
                    <p>
                      from {new Date(booking.start).toLocaleTimeString()}
                      to {new Date(booking.finish).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Amenity;
