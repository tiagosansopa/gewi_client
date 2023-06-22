import { useEffect, useState, useContext } from "react";
import DatePicker from "react-datepicker";
import QRCode from "qrcode.react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { withAuth } from "../../components/withAuth";
import { months, type } from "../../dummy";
import { useRouter } from "next/router";
import { accessStyles, contactsStyles } from "../../styles";
import Contacts from "../../components/Contacts";
const NewAccess = ({ user }) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [qrCodeContent, setQRCodeContent] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [contact, setContact] = useState();
  const [viviendaOptions, setViviendaOptions] = useState([]);
  const [property, setProperty] = useState();

  useEffect(() => {
    getProperties(user);
  }, []);
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const getProperties = async (user) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_NAME}/properties/${user._id}`
      );

      console.log(
        "Las propiedades del usuario son: ",
        response.data.properties
      );
      setViviendaOptions(response.data.properties);
    } catch (error) {
      console.log("error getting properties");
      console.log(error);
    }
  };
  const saveContact = async (newContact) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/contact`,
        newContact
      );
      console.log("Se guardo el contacto", response.data);
      setContact(response.data.contact);
      console.log(response.data.contact);
    } catch (error) {
      console.log("Error saving contact");
    }
  };
  const saveAccess = async (newAccess) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_NAME}/access`,
        newAccess
      );
      console.log("Accesso almacenado", response.data);
      setQRCodeContent(
        `${process.env.NEXT_PUBLIC_API_NAME}/key/${response.data.access._id}`
      );
      setContact();
      window.alert(response.data.message);
      router.push("/access");
    } catch (err) {
      console.log(err);
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
    e.target.reset();
  };
  const handleNewAccess = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const type = formData.get("tipo");
    const newAccess = {
      owner: user._id,
      contact: contact._id,
      property,
      type,
      start: startDate,
      finish: endDate,
      status: 3,
    };
    saveAccess(newAccess);
    e.target.reset();
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
    e.target.reset();
  };
  return (
    <div className={accessStyles.containerNew}>
      {qrCodeContent ? (
        <div className={accessStyles.qrCodeContainer}>
          {/*<h2 className={accessStyles.qrCodeTitle}>QR Code</h2>*/}
          <QRCode value={qrCodeContent} className={accessStyles.qrCode} />
        </div>
      ) : (
        <>
          <h1>New Access</h1>
          {!contact ? (
            <>
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
                <Contacts setContact={setContact} />
              )}
            </>
          ) : (
            <form onSubmit={handleNewAccess} className={accessStyles.form}>
              <div className={contactsStyles.messageContent}>
                <span>{contact.name}</span>
                <p>{contact.lastName}</p>
              </div>
              <div className={accessStyles.formGroup}>
                <label htmlFor="propiedad" className={accessStyles.label}>
                  Propiedad
                </label>
                <select
                  id="propiedad"
                  name="propiedad"
                  className={accessStyles.input}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setProperty(e.target.value);
                  }}
                >
                  {viviendaOptions.map((option) => (
                    <option value={option._id} key={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="tipo" className={accessStyles.label}>
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
                Enviar
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};
export const getServerSideProps = withAuth();
export default NewAccess;
