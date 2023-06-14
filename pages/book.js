import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  setDay,
  addMonths,
  parse,
  format,
  addHours,
} from "date-fns";

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
  const [reservas, setReservas] = useState([]);
  const [excluded, setExcluded] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [highlightWithRanges, sethighlightWithRanges] = useState([]);
  const [hours, setHours] = useState([]);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    readLocalStorage();
  }, []);

  useEffect(() => {
    getMonthBookings(new Date());
    getDayBookings(new Date());
  }, [amenity.id]);

  const OnChangeDate = (e) => {
    setSelectedDate(e);
    getDayBookings(e);
  };

  const fillHours = (eventsArray) => {
    const openTime = parse(amenity.schedule.open, "H:mm", new Date());
    const closeTime = parse(amenity.schedule.close, "H:mm", new Date());

    const hoursArray = [];
    let currentTime = openTime;

    while (currentTime <= closeTime) {
      const formattedTime = format(currentTime, "H:mm");
      hoursArray.push(formattedTime);
      currentTime = addHours(currentTime, 1);
    }

    const filteredHoursArray = hoursArray.filter((hour) => {
      const hourTime = parse(hour, "H:mm", new Date());
      console.log("hour time", hourTime);
      // Check if the hour falls outside the start and finish times of any event
      return !eventsArray.some((event) => {
        const eventStartTime = parse(
          format(new Date(event.start), "H:mm"),
          "H:mm",
          new Date()
        );
        console.log("start time", eventStartTime);
        const eventFinishTime = parse(
          format(new Date(event.finish), "H:mm"),
          "H:mm",
          new Date()
        );
        console.log("end time", eventFinishTime);

        //console.log("start: ", eventStartTime, " finish: ", eventFinishTime);
        return hourTime >= eventStartTime && hourTime <= eventFinishTime;
      });
    });
    console.log("Horas disponibles", filteredHoursArray);
    setHours(filteredHoursArray);
  };

  const excludeDays = (e) => {
    const currentDate = new Date(e); // Current date
    const weekdaysNumbers = amenity.weekdays; // Monday (0 = Sunday, 1 = Monday, ...)
    const currentMonthStart = startOfMonth(currentDate);
    const nextMonthStart = addMonths(currentMonthStart, 1);
    const currentMonthEnd = endOfMonth(nextMonthStart);
    const weeksOfMonth = eachWeekOfInterval({
      start: currentMonthStart,
      end: currentMonthEnd,
    });

    const nextWeekdays = weekdaysNumbers.reduce((dates, weekdayNumber) => {
      const weekdays = weeksOfMonth.map((week) => setDay(week, weekdayNumber));
      return dates.concat(
        weekdays.filter(
          (date) =>
            date.getMonth() === currentMonthStart.getMonth() ||
            date.getMonth() === nextMonthStart.getMonth()
        )
      );
    }, []);
    setExcluded(nextWeekdays); // Array of Date objects representing all next Mondays within the current month
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
  const handleTimeChange = (event) => {
    const { value } = event.target;
    const [hour, minutes] = value.split(":"); // Extract the hour and minutes from the input value
    setTime({ hour, minutes });
  };

  const handleEventName = (e) => setEventName(e.target.value);

  const getMonthBookings = async (e) => {
    excludeDays(e);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/b`,
        {
          date: new Date(e),
          amenity: amenity._id,
        }
      );
      setBooks(response.data.bookings);
      sethighlightWithRanges(response.data.bookings);
      console.log("month bookings", response.data.bookings);
    } catch (error) {
      console.log("Error getting month bookings");
    }
  };

  const getDayBookings = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/bookings`,
        {
          date: new Date(e).toDateString(),
        }
      );
      const eventsArray = response.data.bookings;
      fillHours(eventsArray);
      setReservas(response.data.bookings);
    } catch (error) {
      console.log("Error getting day bookings");
      console.log(error);
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

  function subDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  return (
    <>
      <div className={amenityStyles.messageHeader}>
        <div className={amenityStyles.leftArrow}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => {
              setAmenity({});
              router.back();
            }}
          />
        </div>
      </div>
      <div className={amenityStyles.container}>
        {amenity.id !== undefined ? (
          <>
            <div className={amenityStyles.headerSection}>
              <div>
                <p>{amenity.name}</p>
                <img className={amenityStyles.amenityImg} src={amenity.img} />
              </div>
              <div>
                <p>Capacidad max: {amenity.capacity} personas</p>
                <p>
                  Open from: {amenity.schedule.open} to:
                  {amenity.schedule.close}
                </p>
                <p>
                  On:
                  {amenity.weekdays.map((day) => {
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
                <p>{amenity.description}</p>
              </div>
            </div>
            <div className={amenityStyles.booking}>
              <div className={amenityStyles.flexColumn}>
                <div className={amenityStyles.calendarWrapper}>
                  <DatePicker
                    highlightDates={highlightWithRanges}
                    selected={selectedDate}
                    onChange={(e) => {
                      OnChangeDate(e);
                    }}
                    // startDate={selectedDate}
                    // endDate={endDate}
                    // selectsRange
                    minDate={new Date()}
                    onMonthChange={(e) => {
                      getMonthBookings(e);
                      excludeDays(e);
                    }}
                    excludeDates={excluded}
                    fixedHeight
                    inline
                  />
                </div>
              </div>
              <div className={amenityStyles.flexColumn}>
                <label htmlFor="hora">Inicio</label>
                <select>
                  {hours.sort().map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
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
                  onChange={handleEventName}
                  value={eventName}
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
    </>
  );
};
export const getServerSideProps = withAuth();
export default Book;
