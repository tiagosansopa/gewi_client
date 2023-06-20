import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import QRCode from "qrcode.react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { withAuth } from "../../components/withAuth";
import { viviendaOptions, months, type } from "../../dummy";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "next/router";
import { accessStyles } from "../../styles";
import Contacts from "../../components/Contacts";
const NewAccess = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [qrCodeContent, setQRCodeContent] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [enviar, setEnviar] = useState(false);

  const { user } = useContext(AuthContext);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const saveContact = async (newContact) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/contact`,
        newContact
      );
      console.log("Se guardo el contacto", response.data);
    } catch (error) {
      console.log("Error saving contact");
    }
  };

  const handleNewContact = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const nombre = formData.get("nombre");
    const apellido = formData.get("apellido");
    const telefono = formData.get("telefono");
    const newContact = {
      name: nombre,
      lastName: apellido,
      phone: telefono,
      id: user._id,
    };
    saveContact(newContact);
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
    <div className={accessStyles.containerNew}>
      <h1>New Access</h1>
      <div className={accessStyles.sliderButton}>
        <button
          className={`${accessStyles.toggle} ${
            !isFormVisible ? accessStyles.selected : ""
          } `}
          onClick={toggleForm}
        >
          Existente
        </button>
        <button
          className={`${accessStyles.toggle} ${
            isFormVisible ? accessStyles.selected : ""
          } `}
          onClick={toggleForm}
        >
          Nuevo
        </button>
      </div>

      {isFormVisible ? (
        <form onSubmit={handleNewContact} className={accessStyles.form}>
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
            <label htmlFor="apellido" className={accessStyles.label}>
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
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
          <button type="submit" className={accessStyles.submitButton}>
            Crear
          </button>
        </form>
      ) : (
        <Contacts />
      )}

      {enviar && (
        <form onSubmit={handleSubmit} className={accessStyles.form}>
          <div className={accessStyles.formGroup}>
            <label htmlFor="vivienda" className={accessStyles.label}>
              Propiedad
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
          <button type="submit" className={accessStyles.submitButton}>
            Enviar
          </button>
        </form>
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
export const getServerSideProps = withAuth();
export default NewAccess;
