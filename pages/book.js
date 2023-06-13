import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSpaghettiMonsterFlying,
  faBirthdayCake,
  faPersonBreastfeeding,
} from "@fortawesome/free-solid-svg-icons";

const Book = () => {
  const router = useRouter();
  const { amenity, setAmenity, readLocalStorage } = useContext(AuthContext);
  const myInfo = useContext(AuthContext);
  const [reservas, setReservas] = useState([]);
  // const [selectedDate, setSelectedDate] = useState();
  //const [endDate, setEndDate] = useState(null);

  // const [startTime, setStartTime] = useState({ hour: "", minutes: "" });
  // const [endTime, setEndTime] = useState({ hour: "", minutes: "" });
  // const [eventName, setEventName] = useState("");
  // const [amenityList, setSetAmenityList] = useState([]);

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
  const handleTimeChange = (event) => {
    const { value } = event.target;
    const [hour, minutes] = value.split(":"); // Extract the hour and minutes from the input value
    setTime({ hour, minutes });
  };
  // const OnChangeDate = (e) => {
  //   //const [start, end] = e;
  //   setSelectedDate(e);
  //   // setEndDate(end);

  //   getDayBookings(e);
  // };

  const handleEventName = (e) => setEventName(e.target.value);

  const getDayBookings = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/bookings`,
        {
          date: new Date().toDateString(),
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
      window.alert(response.data.message);
    } catch (error) {
      console.log("Error getting day bookings");
    }
  };

  useEffect(() => {
    const storedInfo = myInfo.readLocalStorage();
    if (storedInfo) {
      myInfo.setIsAuthenticated(true);
    }
  }, [myInfo.isAuthenticated]);

  return (
    <div className={amenityStyles.container}>
      <div className={amenityStyles.messageHeader}>
        <div className={amenityStyles.leftArrow}>
          <FontAwesomeIcon icon={faArrowLeft} onClick={() => router.back()} />
        </div>
      </div>

      {myInfo.amenity === undefined ? (
        <>
          <div className={amenityStyles.headerSection}>
            <div>
              <p>{myInfo.amenity.name}</p>
              <img
                className={amenityStyles.amenityImg}
                src={myInfo.amenity.img}
              />
            </div>
            <div>
              <p>Capacidad max: {myInfo.amenity.capacity} personas</p>
              <p>
                Open from: {myInfo.amenity.schedule.open} to:
                {myInfo.amenity.schedule.close}
              </p>
              <p>
                On:
                {myInfo.amenity.weekdays.map((day) => {
                  return <span> {day}, </span>;
                })}
              </p>
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
            </div>
            <div>
              <p>{myInfo.amenity.description}</p>
            </div>
          </div>
          <div className={amenityStyles.booking}>
            <div className={amenityStyles.flexColumn}>
              <div className={amenityStyles.calendarWrapper}>
                <DatePicker
                  // selected={selectedDate}
                  // onChange={OnChangeDate}
                  // startDate={selectedDate}
                  // endDate={endDate}
                  // selectsRange
                  inline
                />
              </div>
            </div>
            <div className={amenityStyles.flexColumn}>
              <label htmlFor="hora">Inicio</label>
              <input
                type="time"
                // value={`${startTime.hour}:${startTime.minutes}`}
                // onChange={handleTimeChange}
                id="hora"
                name="hora"
              />
              <label htmlFor="hora">Fin</label>
              <input
                type="time"
                // value={`${startTime.hour}:${startTime.minutes}`}
                // onChange={handleTimeChange}
                id="hora"
                name="hora"
              />

              <label htmlFor="nombre">Nombre de evento</label>
              <input
                id="nombre"
                name="nombre"
                // onChange={handleEventName}
                // value={eventName}
              ></input>
              <button>Agendar</button>
              {/* <button onClick={bookAmenity}>Agendar</button> */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export const getServerSideProps = withAuth();
export default Book;
