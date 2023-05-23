import { useEffect, useState } from "react";
import { accessStyles } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker } from "react-date-range";
import QRCode from "qrcode.react";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme
const vigentesData = [
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 1",
    dateTime: "2023-05-12 10:00 AM",
    type: "Type 1",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 2",
    dateTime: "2023-05-13 2:30 PM",
    type: "Type 2",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 3",
    dateTime: "2023-05-14 4:00 PM",
    type: "Type 3",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 4",
    dateTime: "2023-05-15 9:00 AM",
    type: "Type 4",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 5",
    dateTime: "2023-05-16 1:30 PM",
    type: "Type 5",
  },
];

const solicitadosData = [
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 6",
    dateTime: "2023-05-17 3:30 PM",
    type: "Type 6",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 7",
    dateTime: "2023-05-18 11:00 AM",
    type: "Type 7",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 8",
    dateTime: "2023-05-19 5:45 PM",
    type: "Type 8",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 9",
    dateTime: "2023-05-20 9:30 AM",
    type: "Type 9",
  },
  {
    thumbnail: "/images/temp/pm1.jpg",
    place: "Place 10",
    dateTime: "2023-05-21 12:15 PM",
    type: "Type 10",
  },
];

const viviendaOptions = ["House 1", "House 2", "House 3", "House 4"]; // Dummy values for house names

const Access = () => {
  const [showVigentes, setShowVigentes] = useState(false);
  const [showSolicitados, setShowSolicitados] = useState(false);
  const [showNuevo, setShowNuevo] = useState(false);
  const [qrCodeContent, setQRCodeContent] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const handleVigentesClick = () => {
    setShowVigentes(!showVigentes);
  };

  const handleSolicitadosClick = () => {
    setShowSolicitados(!showSolicitados);
  };

  const handleNuevoClick = () => {
    setShowNuevo(!showNuevo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    // Generate the QR code content using the form data
    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const telefono = formData.get("telefono");
    const vivienda = formData.get("vivienda");
    const hora = formData.get("hora");
    const dateRangeValue = formData.get("dateRange");
    // Generate the QR code content using the form data
    const qrCodeContent = `${nombre}, ${telefono}, ${vivienda}, ${hora}, ${dateRangeValue}`;
    setQRCodeContent(qrCodeContent);
  };
  return (
    <div className={accessStyles.container}>
      <h1 className={accessStyles.title}>Accesos</h1>
      <div className={accessStyles.buttonsContainer}>
        <button className={accessStyles.button} onClick={handleVigentesClick}>
          Vigentes
        </button>
        <button
          className={accessStyles.button}
          onClick={handleSolicitadosClick}
        >
          Solicitados
        </button>
        <button className={accessStyles.button} onClick={handleNuevoClick}>
          Nuevo <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {showVigentes && (
        <div className={accessStyles.listContainer}>
          <h2 className={accessStyles.listTitle}>Vigentes</h2>
          <ul className={accessStyles.list}>
            {vigentesData.map((item, index) => (
              <li key={index} className={accessStyles.listItem}>
                <img
                  className={accessStyles.thumbnail}
                  src={item.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                />
                <div className={accessStyles.details}>
                  <h3 className={accessStyles.place}>{item.place}</h3>
                  <p className={accessStyles.dateTime}>{item.dateTime}</p>
                  <p className={accessStyles.type}>{item.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSolicitados && (
        <div className={accessStyles.listContainer}>
          <h2 className={accessStyles.listTitle}>Solicitados</h2>
          <ul className={accessStyles.list}>
            {solicitadosData.map((item, index) => (
              <li key={index} className={accessStyles.listItem}>
                <img
                  className={accessStyles.thumbnail}
                  src={item.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                />
                <div className={accessStyles.details}>
                  <h3 className={accessStyles.place}>{item.place}</h3>
                  <p className={accessStyles.dateTime}>{item.dateTime}</p>
                  <p className={accessStyles.type}>{item.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showNuevo && (
        <div className={accessStyles.formContainer}>
          <h2 className={accessStyles.formTitle}>Formulario</h2>
          <form onSubmit={handleSubmit} className={accessStyles.form}>
            <div className={accessStyles.formGroup}>
              <label htmlFor="nombre" className={accessStyles.label}>
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className={accessStyles.input}
              />
            </div>
            <div className={accessStyles.formGroup}>
              <label htmlFor="telefono" className={accessStyles.label}>
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                className={accessStyles.input}
              />
            </div>
            <div className={accessStyles.formGroup}>
              <label htmlFor="vivienda" className={accessStyles.label}>
                Vivienda
              </label>
              <select
                id="vivienda"
                name="vivienda"
                className={accessStyles.input}
              >
                {viviendaOptions.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className={accessStyles.formGroup}>
              <label htmlFor="fecha" className={accessStyles.label}>
                Fecha
              </label>
              <DateRangePicker
                onChange={(item) => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                name="dateRange"
              />
            </div>
            <div className={accessStyles.formGroup}>
              <label htmlFor="hora" className={accessStyles.label}>
                Hora
              </label>
              <input
                type="time"
                id="hora"
                name="hora"
                className={accessStyles.input}
              />
            </div>
            <button type="submit" className={accessStyles.submitButton}>
              Generate QR Code
            </button>
          </form>
        </div>
      )}

      {qrCodeContent && (
        <div className={accessStyles.qrCodeContainer}>
          <h2 className={accessStyles.qrCodeTitle}>QR Code</h2>
          <QRCode value={qrCodeContent} className={accessStyles.qrCode} />
        </div>
      )}
    </div>
  );
};
export default Access;
