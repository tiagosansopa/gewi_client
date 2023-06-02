import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import QRCode from "qrcode.react";
import "react-datepicker/dist/react-datepicker.css";

import { viviendaOptions, months, type } from "../../dummy";
import { useRouter } from "next/router";
import { accessStyles } from "../../styles";
const NewAccess = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [qrCodeContent, setQRCodeContent] = useState("");

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const telefono = formData.get("telefono");
    const vivienda = formData.get("vivienda");
    const hora = formData.get("hora");
    const qrCodeContent = `${nombre}, ${telefono}, ${vivienda}, ${hora}`;
    setQRCodeContent(qrCodeContent);
  };
  return (
    <div className={accessStyles.container}>
      <h1>New Access</h1>

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
          <select id="vivienda" name="vivienda" className={accessStyles.input}>
            {viviendaOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="vivienda" className={accessStyles.label}>
            Tipo
          </label>
          <select id="tipo" name="tipo" className={accessStyles.input}>
            {type.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className={accessStyles.formGroup}>
          <label htmlFor="fecha" className={accessStyles.label}>
            Fecha
          </label>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
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
      {qrCodeContent && (
        <div className={accessStyles.qrCodeContainer}>
          <h2 className={accessStyles.qrCodeTitle}>QR Code</h2>
          <QRCode value={qrCodeContent} className={accessStyles.qrCode} />
        </div>
      )}
    </div>
  );
};

export default NewAccess;
