import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { withAuth } from "../components/withAuth";
import { amenityStyles } from "../styles";
import { useRouter } from "next/router";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightWithRanges, sethighlightWithRanges] = useState([]);
  const [hours, setHours] = useState([]);
  const [endHours, setEndHours] = useState([]);
  const [startHour, setstartHour] = useState("");
  const [endHour, setendHour] = useState("");
  const [eventName, setEventName] = useState("");
  const [localTimezone, setLocalTimezone] = useState("");

  useEffect(() => {
    setLocalTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    readLocalStorage();
  }, []);

  useEffect(() => {
    if (amenity.id) {
      getMonthBookings(new Date());
      getDayBookings(new Date());
    }
  }, [amenity.id]);

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
      //console.log("hour time", hourTime);
      // Check if the hour falls outside the start and finish times of any event
      return !eventsArray.some((event) => {
        const eventStartTime = parse(
          format(new Date(event.start), "H:mm"),
          "H:mm",
          new Date()
        );
        //console.log("start time", eventStartTime);
        const eventFinishTime = parse(
          format(new Date(event.finish), "H:mm"),
          "H:mm",
          new Date()
        );
        //console.log("end time", eventFinishTime);

        // console.log(
        //   "hour validating: ",
        //   hourTime,
        //   "start: ",
        //   eventStartTime,
        //   " finish: ",
        //   eventFinishTime
        // );
        return hourTime >= eventStartTime && hourTime <= eventFinishTime;
      });
    });
    console.log("no ordern ", filteredHoursArray);
    filteredHoursArray.sort((a, b) => {
      const timeA = parse(a, "H:mm", new Date());
      const timeB = parse(b, "H:mm", new Date());
      return timeA.getTime() - timeB.getTime();
    });
    console.log("ordern ", filteredHoursArray);
    //console.log("Horas disponibles", filteredHoursArray);
    setHours(filteredHoursArray);
  };

  const excludeDays = (e) => {
    const currentDate = new Date(e); // Current date
    console.log("la amenidad es ", amenity);
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
      //console.log("month bookings", response.data.bookings);
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
      //console.log("eventos del dia ", eventsArray);
      //console.log("eventos del dia local ", );
      const horalocal = localHourEvent(eventsArray);
      fillHours(horalocal);
      setReservas(horalocal);
    } catch (error) {
      console.log("Error getting day bookings");
      console.log(error);
    }
  };

  const bookAmenity = async () => {
    const send = buildBook();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/book`,
        send
      );
      setEventName("");
      window.alert(response.data.message);
    } catch (error) {
      console.log("Error getting day bookings");
    }
  };

  function convertToLocalDate(dateString, timezone) {
    return moment.tz(dateString, timezone).utc().format();
  }

  function convertToUTCDate(dateString, timezone) {
    return moment.tz(dateString, "UTC").tz(timezone).format();
  }
  const OnChangeDate = (e) => {
    setSelectedDate(e);
    setEndHours([]);
    setstartHour(""); // Reset startHour state to empty
    setendHour(""); // Reset endHour state to empty
    getDayBookings(e);
  };

  const localHourEvent = (e) => {
    return e.map((event) => {
      const updatedEvent = { ...event };

      // Convert start date to local timezone
      updatedEvent.start = moment(event.start).tz(localTimezone).toDate();

      // Convert finish date to local timezone
      updatedEvent.finish = moment(event.finish).tz(localTimezone).toDate();

      return updatedEvent;
    });
  };

  const setUpInitDate = (e) => {
    const [hour, minute] = e.split(":");
    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(hour);
    updatedDate.setMinutes(minute);
    const utcDateString = convertToLocalDate(updatedDate, localTimezone);
    const convertedDateString = convertToUTCDate(utcDateString, localTimezone);
    setstartHour(utcDateString);
  };

  const setUpEndDate = (e) => {
    const [hour, minute] = e.split(":");
    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(hour);
    updatedDate.setMinutes(minute);
    const utcDateString = convertToLocalDate(updatedDate, localTimezone);
    const convertedDateString = convertToUTCDate(utcDateString, localTimezone);
    setendHour(utcDateString);
  };

  function getPossibleFinishHours(e) {
    const hour = parseInt(e.split(":")[0]);
    const startDaysArray = reservas
      .map((event) => new Date(event.start).getHours())
      .sort((a, b) => a - b);
    startDaysArray.push(
      parse(amenity.schedule.close, "H:mm", new Date()).getHours()
    );
    const limit = startDaysArray.find((value) => value >= hour);

    console.log("el limite es", hour, limit);
    const finishHours = [];
    for (let i = hour + 1; i <= limit; i++) {
      finishHours.push(i);
    }

    console.log("end hours ", finishHours);
    setEndHours(finishHours);
  }

  const buildBook = () => {
    const book = {
      eventName: eventName,
      start: startHour,
      finish: endHour,
      amenity: amenity._id,
    };
    console.table(book);
    return book;
  };

  return (
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
            {/*<div>
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
            </div>*/}
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
              <select
                onChange={(e) => {
                  setUpInitDate(e.target.value);
                  getPossibleFinishHours(e.target.value);
                }}
                value={startHour}
              >
                {startHour === "" && (
                  <option value="">Select a start hour</option>
                )}
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <label htmlFor="horaFin">Fin</label>
              <select
                onChange={(e) => {
                  setUpEndDate(e.target.value);
                }}
                value={endHour}
              >
                {endHour === "" && <option value="">Select a end hour</option>}
                {endHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>

              <label htmlFor="nombre">Nombre de evento</label>
              <input
                id="nombre"
                name="nombre"
                onChange={handleEventName}
                value={eventName}
              ></input>
              <button onClick={bookAmenity}>Agendar</button>
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
